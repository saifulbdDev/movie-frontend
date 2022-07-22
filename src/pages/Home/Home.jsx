/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../../store/reducers/movies/movieSlice";
import Table from "../../components/Table/Table";
import Spinner from "../../components/Spinner/Spinner";
import "./home.scss";


export default function Home() {
 
  const dipatch = useDispatch();
  const columns = [
    { name: "Name", value: "name" },
    {
      name: "Description",
      value: "description",
    },
    {
      name: "Action",
      value: "action",
      action: true,
    },
  ];

  const { movies, isLoading } = useSelector((state) => state.movies);
  const deleteHandle = (value) => {
    console.log(value);
    dipatch(deleteMovie(value));
  };

  
  useEffect(() => {
    dipatch(getMovies());
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="movies">
      <div className="movies-header">
        <div className="">
          <h2>Movie List</h2>
        </div>

        <div className="">
          <Link to="/add-movie" className="default_button">
            Add Favorite Movie
          </Link>
        </div>
      </div>

      <Table
        rows={movies}
        columns={columns}    
        deleteHandle={deleteHandle}
      />

    </section>
  );
}
