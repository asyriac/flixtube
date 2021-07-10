import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import Loading from "../Loading/Loading";

const Logout = () => {
  const { isLoggedIn, logoutUser } = useAuthContext();

  useEffect(() => {
    logoutUser();
  }, []);

  if (isLoggedIn) return <Loading />;

  return <Navigate replace to="/login" />;
};

export default Logout;
