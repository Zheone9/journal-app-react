import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWithEmailAndPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";

const RegisterScreen = () => {
  const { msgError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: "Pedro",
    email: "email@example.com",
    password: "password",
    password2: "password",
  });
  const { name, email, password, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailAndPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Nombre inválido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email inválido"));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(setError("Contraseña inválida"));
      return false;
    }
    dispatch(removeError());

    return true;
  };

  return (
    <div className="text-center">
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleSubmit} data-testid="submit">
        {msgError && (
          <div className="auth__alert-error" data-testid="alert-error">
            {msgError}
          </div>
        )}
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="none"
          value={name}
          onChange={handleInputChange}
        />
        <input
          data-testid="email"
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
        <input
          className="auth__input"
          type="password"
          name="password2"
          placeholder="Confirm password"
          value={password2}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          <b>Register</b>
        </button>
        {/* {!msgError && (
          <div className="auth__alert-success">Registrado correctamente</div>
        )} */}
        <Link className="link" to="/auth/login">
          Already Registered?
        </Link>
      </form>
    </div>
  );
};

export default RegisterScreen;
