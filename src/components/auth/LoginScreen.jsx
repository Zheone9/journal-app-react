import React from "react";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { name } = useSelector((state) => state.auth);

  const [formValues, handleInputChange] = useForm({
    email: "test@example.com",
    password: 12345,
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };
  const handleGoogleLogin = (e) => {
    dispatch(startGoogleLogin());
  };

  return (
    <div className="text-center ">
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="none"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="btn btn-primary btn-block"
          type="submit"
          onClick={handleLogin}
        >
          <b>Login</b>
        </button>

        <div className="auth__social-network">
          <GoogleButton className="btn-google" onClick={handleGoogleLogin} />
        </div>
        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </div>
  );
};

export default LoginScreen;
