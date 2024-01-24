import { AuthContext } from "@/context/AuthContextProvider"
import { useContext } from "react"

export const useAuth = ()=>{
    useContext(AuthContext);
}