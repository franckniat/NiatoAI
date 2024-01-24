
import { NextOrObserver, User, onAuthStateChanged,signOut as authSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";

type AuthContextType = {
    user : User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isLoading: boolean;
    signOut : ()=>Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user : null,
    isLoading: true,
    signOut: async () => {},
    setUser: () => {}
});

export const useFirebaseAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const clearUser = ()=>{
        setUser(null);
        setIsLoading(false);
    }
    const signOut = async ():Promise<void> =>{
        authSignOut(auth).then(clearUser);
        router.push("/");
    }

    const authStateChanged:NextOrObserver<User | null> = async(user:User|null)=>{
        setIsLoading(true);
        if(!user){
            clearUser();
            return;
        }
        setUser(user);
        setIsLoading(false);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return ()=>{unsubscribe()}
    },);

    return{
        user,
        isLoading,
        setUser,
        signOut
    }
}
export const AuthUserProvider = ({children}:{children:React.ReactNode}) => {
    const auth = useFirebaseAuth();
    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}