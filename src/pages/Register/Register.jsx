
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";

import { register, reset } from "../../store/reducers/auth/authSlice";
import "./register.scss";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
   
      <section className="section_register">
       
        <form className="register_form" onSubmit={onSubmit}>
          <p className="register_form_title">Register</p>
          <input
            className="register_form_input"
            type="text"
            placeholder="User Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <input
            className="register_form_input"
            type="email"
            placeholder="User Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />

          <input
            className="register_form_input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
          />
          <input
            className="register_form_input"
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={onChange}
            required
          />

          <div className="register_button_wrapper">
            <Button type="submit" text="Register" />
          </div>
          <p className="register_login">
            Already have an account?
            <Link to="/login">
              <span className="register_login_span"> Login!</span>
            </Link>
          </p>
        </form>
      </section>
   
  );
}
