import useUser from "@/hooks/useUser";
import AuthService from "@/services/AuthService";
import { TLogin } from "@/types/User";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LoginHandler() {
    const router = useRouter();
    const {user, setUser} = useUser();

    return {
    };
}