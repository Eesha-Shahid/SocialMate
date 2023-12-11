import useUser from "@/hooks/useUser";
import AuthService from "@/services/AuthService";
import { TLogin } from "@/types/User";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LoginHandler() {
    const router = useRouter();
    const {user, setUser} = useUser();

    const handleLoginSubmit = async(values: TLogin) => {
        try {
          const data = await AuthService.login(values.email, values.password);
          setCookie('token',data.token)
          setUser(data.user)
          console.log('Sign-in successful');
          router.push('/dashboard');
        } catch (error) {
          alert(error);
        }
    }

    return {
        handleLoginSubmit
    };
}