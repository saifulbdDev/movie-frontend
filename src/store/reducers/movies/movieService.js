import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";
// Create new movie
const createMovie = async (movieData) => {
  const response = await axios.post(`${API_URL}/movie`, movieData);
  if (response) {
    toast.success("Favorite Movie Added Successfully");
  }
  return response.data;
};

// Get user movies
const getMovies = async () => {
  const response = await axios.get(`${API_URL}/movie`);

  return response.data;
};

// Delete user movie
const deleteMovie = async (movieId) => {
  const response = await axios.delete(`${API_URL}/movie/` + movieId);
  if (response) {
    toast.success("Favorite Movie Delete");
    return movieId;
  }
 
};

const movieService = {
  createMovie,
  getMovies,
  deleteMovie,
};

export default movieService;
