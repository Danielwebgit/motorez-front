import apiService from "@/Services/ApiService";
import { createContext, useState } from "react";
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

type AuthContextType = {
    signIn: ({ email, password }: SignInData) => Promise<void>;
    user: User | null;
}

type User = {
    email: string;
    name: string;
}

type SignInData = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: {children: any}) {

    const route = useRouter();
    const [user] = useState<User | null>(null);

    async function signIn({ email, password }: SignInData) {

        const { data } = await apiService.authLogin(email, password);
     
        setCookie(undefined, 'mz-auth-token.access_token', data.original.access_token, {
            maxAge: 60 * 60 * 10 // 1 hour
        });

        setCookie(undefined, 'mz-auth-token.session_id', data.original.session_id, {
            maxAge: 60 * 60 * 24 // 1 hour
        });

        route.push('dashboard')
    }

    return (
        <AuthContext.Provider value={{ signIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}