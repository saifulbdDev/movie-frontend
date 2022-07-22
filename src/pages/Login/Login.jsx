import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";

import { login, reset } from "../../store/reducers/auth/authSlice";

import Button from "../../components/Button/Button";

import "./login.scss";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jwt_token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(isError, message, "message");
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || jwt_token) {
      navigate("/");
    }

    dispatch(reset());
  }, [jwt_token, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="section_login">
      <form className="login_form" onSubmit={onSubmit}>
        <p className="login_form_title">Sign in</p>
        <input
          className="login_form_input"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <input
          className="login_form_input"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />

        <div className="login_button_wrapper">
          <Button type="submit" text="Sign In" />
        </div>
        <p className="login_register">
          Don&#39;t have an account?
          <Link to="/register">
            <span className="login_register_span"> Register!</span>
          </Link>
        </p>
      </form>
    </section>
  );
}
