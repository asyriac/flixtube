import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/auth-reducer";
import { authAPI } from "../services/index";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginUser = async (username, password) => {
    const response = await authAPI.loginUser({ username, password });
    if (response.status === 200) dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: response.data.result } });
    else dispatch({ type: "LOGIN", payload: { isLoggedIn: false, serverError: response.data.message } });
  };

  const registerUser = async (firstName, lastName, email, username, password) => {
    const response = await authAPI.registerUser({ firstName, lastName, email, username, password });
    if (response.status === 200) dispatch({ type: "REGISTER", payload: { isLoggedIn: true, user: response.data.result } });
    else dispatch({ type: "REGISTER", payload: { isLoggedIn: false } });
  };

  const fetchCurrentUser = async () => {
    const response = await authAPI.getCurrentUser();
    if (response.status === 200) {
      dispatch({
        type: "FETCH_CURRENT_USER",
        payload: {
          isLoggedIn: true,
          user: response.data.result,
        },
      });
    } else {
      dispatch({
        type: "FETCH_CURRENT_USER",
        payload: { isLoggedIn: false },
      });
    }
  };

  const logoutUser = async () => {
    const response = await authAPI.logoutUser();
    if (response.status === 200) {
      dispatch({ type: "LOGOUT", payload: { isLoggedIn: false, user: null } });
    } else dispatch({ type: "LOGOUT", payload: { isLoggedIn: true } });
  };

  return <AuthContext.Provider value={{ ...state, loginUser, registerUser, fetchCurrentUser, logoutUser }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
