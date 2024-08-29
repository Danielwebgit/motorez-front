import apiService from "@/Services/ApiService";
import { createContext, useEffect, useState } from "react";


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

    const [user] = useState<User | null>(null);

    async function signIn({ email, password }: SignInData) {
        const { data } = await apiService.authLogin(email, password);
    }

    return (
        <AuthContext.Provider value={{ signIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}