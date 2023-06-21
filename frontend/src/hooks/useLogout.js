import { useUserContext } from "./useUserContext";
import { useStudentContext } from "./useStudentContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();
  const { dispatch: studentDispatch } = useStudentContext();

  const logout = async () => {
    try {
      // remove user from local storage
      localStorage.removeItem("user");

      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      studentDispatch({ type: "SET_STUDENTS", payload: null });
    } catch (error) {
      console.log("Error While Logging out : ", error);
    }
  };

  return { logout };
};
