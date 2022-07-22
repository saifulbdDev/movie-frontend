/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createMovie } from "../../store/reducers/movies/movieSlice";

import Spinner from "../../components/Spinner/Spinner";
import "./addMovie.scss";
const MovieAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    description: "",
  });
  const enabled = state.name.length > 0 && state.description.length > 0;
  const {  isLoading,  } = useSelector(
    (state) => state.movies
  );
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  
    dispatch(createMovie(state));
    navigate('/')
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="content">
      <form className="add_form" onSubmit={onSubmit}>
        <h3>Add Favorite Movie</h3>

        <div>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Movie Name"
          />
        </div>
        <div>
          <textarea
            name="description"
            rows="4"
            placeholder="Movie description"
            value={state.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="content-footer">
          <button className="default_button mb-3" disabled={!enabled}>
            Save
          </button>
          <br />
          <Link to="/">
            {" "}
            <span className="span"> back</span>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MovieAdd;
