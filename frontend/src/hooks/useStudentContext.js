import { StudentContext } from "../context/studentContext";
import { useContext } from "react";

export const useStudentContext = () => {
    const context = useContext(StudentContext);

    if(!context){
        throw Error ("useStudentsContext must be used inside an StudentContextProvider")
    }

    return context 
}