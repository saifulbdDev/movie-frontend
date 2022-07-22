import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiCameraMovie } from "react-icons/bi";

import Button from "../Button/Button";

import { logOut, reset } from "../../store/reducers/auth/authSlice";

import "./header.scss";

export default function Header() {
  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  const { jwt_token } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

 
  return (
    <header className="header">
    
      <nav id="navbar">
        <h2>
          <Link to="/">
            <BiCameraMovie />
            Moviepedia
          </Link>
        </h2>
       
        {jwt_token && (
          <div className="button-wrapper">
            <Button text="Log Out" onClick={onLogout} />
          </div>
        )}
      </nav>
    </header>
  );
}
