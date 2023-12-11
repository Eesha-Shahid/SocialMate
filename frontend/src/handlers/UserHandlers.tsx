import useUser from "@/hooks/useUser";
import AuthService from "@/services/AuthService";
import RedditService from "@/services/RedditService";
import UserService from "@/services/UserService";
import { CardInfomration, TSocialLogin } from "@/types/User";
import { googleLogout } from "@react-oauth/google";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function UserHandler() {
    const router = useRouter();
    const {user, setUser} = useUser();
    
    const handleRemovePicture = async() => {
      try {
        await UserService.removeProfilePicture();
        window.location.reload();
      } catch (error) {
        console.error('Error removing profle pic', (error as Error).message);
      }
    }

    const handleSocialSignIn = async (values: TSocialLogin) => {
      try {
          const data = await RedditService.connectToReddit(values.username, values.password);
          setUser(data)
          console.log('Reddit Connected');
          router.push('/profile');
      } 
      catch (error) {
          console.error('Social Sign-in error:', (error as Error).message);
      }
    }

    const handleSocialLogout = async(platform: string) => {
      try {
        if (platform == "reddit"){
          await RedditService.logout()
        }
        window.location.reload();
      } catch (error) {
        console.error('Error logging out: ', (error as Error).message);
      }
    };

    const handleDelete = async() => {
        try{
          if (user?.googleAuth){
            googleLogout();
          }
          await AuthService.deleteProfile();
          deleteCookie('token');
          setUser(null)
          router.replace('/')
        }
        catch(error){
          console.error('Error deleting user profile:', (error as Error).message);
        }
    }

    const handleAddCard = async(values: CardInfomration) => {
      try{
        const data = await UserService.addCardInformation(values.cardNumber, values.expYear,values.expMonth, values.cvc)
        setUser(data)
        router.push('/subscriptions');
      }
      catch(error){
        console.error('Error adding card information:', (error as Error).message);
      }
    }

    const handleLogout = async() => {
      if (user?.googleAuth){
        googleLogout();
      }
      deleteCookie('token');
      setUser(null);
      router.replace("/");
    };

    const fetchUserProfile = async() => {
        try {
          const fetchedUser = await UserService.fetchUserProfile();
          setUser(fetchedUser);
        } catch (error) {
          console.error('Error fetching user profile:', (error as Error).message);
        }
    };

    return {
        handleAddCard,
        handleRemovePicture,
        handleSocialSignIn,
        handleSocialLogout,
        handleLogout,
        fetchUserProfile,
        handleDelete
    };
}