import useUser from "@/hooks/useUser";
import AuthService from "@/services/AuthService";
import { TSignup } from "@/types/User";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function SignUpHandler() {
    const router = useRouter();
    const {user, setUser} = useUser();

    const handleSignUpWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/register/google')
    };

    const handleSignIn = async (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        router.push('/login')
    }

    return {
        handleSignUpWithGoogle,
        handleSignIn,
    };
}