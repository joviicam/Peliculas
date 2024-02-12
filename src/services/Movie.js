import axios from "axios";

const URL_GET_MOVIES = "http://localhost:8080/api/movies";
const URL_GET_MOVIE = "http://localhost:8080/api/movies/";
const URL_POST_MOVIE = "http://localhost:8080/api/movies";
const URL_PUT_MOVIE = "http://localhost:8080/api/movies/";
const URL_DELETE_MOVIE = "http://localhost:8080/api/movies/";

const URL_GET_GENRES = "http://localhost:8080/api/genres";

export const getMovies = async () => {
  const response = await axios.get(URL_GET_MOVIES);
  console.log(response.data);
  return response.data;
};

export const getMovie = async (id) => {
  const response = await axios.get(URL_GET_MOVIE + id);
  return response.data;
};

export const postMovie = async (movie) => {
  const response = await axios.post(URL_POST_MOVIE, movie);
  return response.data;
};

export const putMovie = async (id, movie) => {
  const response = await axios.put(URL_PUT_MOVIE + id, movie);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axios.delete(URL_DELETE_MOVIE + id);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(URL_GET_GENRES);
  return response.data;
};

export default {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie,
  getGenres,
};
