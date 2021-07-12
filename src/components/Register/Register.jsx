import { useLocation, Navigate, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useFetchCurrentUser from "../../hooks/useFetchCurrentUser";
import { useAuthContext } from "../../contexts/auth-context";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Register.css";

const Register = () => {
  let { isLoggedIn, initialLoading, registerUser } = useAuthContext();
  const { state } = useLocation();
  useFetchCurrentUser();
  const path = state?.from || "/";

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(8, "Password should be 8 chars minimum."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password", ""), ""], "Passwords must match")
      .required("Required"),
  });

  const handleRegister = () => {
    const { firstName, lastName, email, username, password } = formik.values;
    registerUser(firstName, lastName, email, username, password);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  if (initialLoading) return <Loading />;

  if (isLoggedIn) return <Navigate to={path} replace />;

  return (
    <div className="flex flex-center login-container">
      <div className="login-form">
        <h3 className="text-center pb-1">Register</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="" htmlFor="firstName">
              First Name
            </label>
            <input className="form-control" type="text" id="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.firstName && formik.errors.firstName && <span className="invalid-feedback">{formik.errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label className="" htmlFor="lastName">
              Last Name
            </label>
            <input className="form-control" type="text" id="lastName" value={formik.values.lastName} onChange={formik.handleChange} autoComplete="off" onBlur={formik.handleBlur} />
            {formik.touched.lastName && formik.errors.lastName && <span className="invalid-feedback">{formik.errors.lastName}</span>}
          </div>
        </div>
        <div className="form-group">
          <label className="" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" value={formik.values.email} onChange={formik.handleChange} autoComplete="off" onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email && <span className="invalid-feedback">{formik.errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="" htmlFor="username">
            Username
          </label>
          <input className="form-control" type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete="off" onBlur={formik.handleBlur} />
          {formik.touched.username && formik.errors.username && <span className="invalid-feedback">{formik.errors.username}</span>}
        </div>
        <div className="form-row">
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
          <div className="form-group">
            <label className="" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              autoComplete="off"
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && <span className="invalid-feedback">{formik.errors.confirmPassword}</span>}
          </div>
        </div>

        <span>
          Have an account?{" "}
          <Link to="/login" className="primary-text">
            Login.
          </Link>
        </span>
        <div className="flex flex-center mt-1">
          <button className="btn btn-secondary btn-sm" onClick={formik.handleSubmit} type="submit" disabled={!formik.isValid}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
