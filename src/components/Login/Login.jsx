import "./Login.css";
import { useLocation, Navigate, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useAuthContext } from "../../contexts/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  let { isLoggedIn, initialLoading, loginUser } = useAuthContext();
  const { state } = useLocation();

  useFetchCurrentUser();

  const path = state?.from || "/";

  const initialValues = {
    username: "johndoe",
    password: "qwert123",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = () => {
    const { username, password } = formik.values;
    loginUser(username, password);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  if (initialLoading) return <Loading />;

  if (isLoggedIn) return <Navigate to={path !== "/logout" ? path : "/"} replace />;

  return (
    <div className="flex flex-center login-container">
      <div className="login-form">
        <h3 className="text-center pb-1">Login</h3>
        <div className="form-group">
          <label className="" htmlFor="username">
            Username
          </label>
          <input className="form-control" type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete="off" onBlur={formik.handleBlur} />
          {formik.touched.username && formik.errors.username && <span className="invalid-feedback">{formik.errors.username}</span>}
        </div>
        <div className="form-group">
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <span className="invalid-feedback">{formik.errors.password}</span>}
        </div>
        <span>
          Don't have an account?{" "}
          <Link to="/register" className="primary-text">
            Register.
          </Link>
        </span>
        <div className="flex flex-center mt-1">
          <button className="btn btn-secondary btn-sm" onClick={formik.handleSubmit} type="button" disabled={!formik.isValid}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
