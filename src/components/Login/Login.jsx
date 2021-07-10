import { useState } from "react";
import "./Login.css";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useAuthContext } from "../../contexts/auth-context";

const Login = () => {
  let { isLoggedIn, initialLoading, loginUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();

  useFetchCurrentUser();

  const path = state?.from || "/";

  const handleLogin = () => {
    loginUser(username, password);
  };

  const resetErrors = () => {
    // if (serverError !== null) dispatch(resetServerError());
  };

  if (initialLoading) return <Loading />;

  if (isLoggedIn) return <Navigate to={path !== "/logout" ? path : "/"} replace />;

  return (
    <div className="flex flex-center login-container">
      <div className="login-form">
        <h3 className="text-center pb-1">Login</h3>
        {/* {serverError && <div className="alert mb-1">{serverError}</div>} */}
        <div className="form-group">
          <label className="" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              resetErrors();
            }}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              resetErrors();
            }}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-center">
          <button className="btn btn-secondary btn-sm" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
