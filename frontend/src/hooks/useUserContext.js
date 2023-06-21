import { userContext } from "../context/userContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(userContext);

    if(!context){
        throw new Error("useUserContext must be used within a UserProvider");
    }

    return context 
}