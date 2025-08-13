import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../config/firebase";
import axios from "axios";

const API_URL = import.meta.env.VITE_DATABASE_URL;

function useMovies() {
  const [user] = useAuthState(auth);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();

      const response = await axios.get(`${API_URL}/movies.json?auth=${token}`);
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Movies");
      }
      const moviesArr = [];
      for (const key in response.data) {
        moviesArr.push({
          id: key,
          title: response.data[key].title,
          uid: response.data[key].uid,
        });
      }
      setMovies(moviesArr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovie = async (movieName) => {
    if (!user) throw new Error("User not authenticated");
    const token = await user.getIdToken();
    const response = await fetch(`${API_URL}/movies.json?auth=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: movieName, uid: user.uid }),
    });
    if (!response.ok) throw new Error("Failed to add recipe.");
    fetchMovies();
  };

  const editMovie = async (movieName, movieId) => {
    if (!user) throw new Error("User not authenticated");
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${API_URL}/movies/${movieId}.json?auth=${encodeURIComponent(token)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: movieName, uid: user.uid }),
        }
      );
      if (!response.ok) throw new Error("Failed to add recipe.");
      fetchMovies();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteMovie = async (movieId) => {
    if (!user) throw new Error("User not authenticated");
    const token = await user.getIdToken();
    const response = await fetch(
      `${API_URL}/movies/${movieId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete recipe.");

    fetchMovies();
  };

  return { movies, loading, addMovie, deleteMovie, editMovie, user };
}

export default useMovies;
