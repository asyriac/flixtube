import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useAuthContext } from "../../contexts/auth-context";

const Register = () => {
  let { isLoggedIn, initialLoading, registerUser } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  useFetchCurrentUser();
  const path = state?.from || "/";

  const handleRegister = () => {
    registerUser(firstName, lastName, email, username, password);
  };

  if (initialLoading) return <Loading />;

  if (isLoggedIn) return <Navigate to={path} replace />;

  return (
    <div className="flex flex-center login-container">
      <div className="login-form">
        <h3 className="text-center pb-1">Register</h3>
        <div className="form-group">
          <label className="" htmlFor="firstname">
            First Name
          </label>
          <input className="form-control" type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="" htmlFor="lastname">
            Last Name
          </label>
          <input className="form-control" type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="" htmlFor="username">
            Username
          </label>
          <input className="form-control" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="" htmlFor="password">
            Password
          </label>
          <input className="form-control" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </div>
        <div className="flex flex-center">
          <button className="btn btn-secondary btn-sm" onClick={handleRegister}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
