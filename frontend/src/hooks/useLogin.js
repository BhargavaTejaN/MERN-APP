import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useUserContext();

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch("/api/user/login", options);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setLoading(false);
      }

      if (response.ok) {
        // save user details to localstoreage
        localStorage.setItem("user", JSON.stringify(data));

        dispatch({ type: "LOGIN", payload: data });
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error While Loging : ", error);
    }
  };

  return { login, error, loading };
};
