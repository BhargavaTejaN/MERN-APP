import {useState} from 'react';
import { useUserContext } from './useUserContext';

export const useSignup = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const {dispatch} = useUserContext();

    const signup = async (email,password) => {
        setLoading(true);
        setError(null);

        const options = {
            method: "POST",
            headers:{
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({email,password})
        }

        const response = await fetch("/api/user/signup",options);
        const data = await response.json();

        if(!response.ok){
            setLoading(false);
            setError(data.error)
        }

        if(response.ok){
            // save the userto local storage 
            localStorage.setItem("user",JSON.stringify(data));

            dispatch({type : 'LOGIN',payload : data});

            setLoading(false);
            setError(null);
        }

    }

    return {signup,error,loading}
}