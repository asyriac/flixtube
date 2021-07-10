import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ path, ...props }) => {
  const { isLoggedIn, initialLoading } = useAuthContext();

  useFetchCurrentUser();

  if (initialLoading) return <Loading />;

  return isLoggedIn ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/login" />;
};

export default PrivateRoute;
