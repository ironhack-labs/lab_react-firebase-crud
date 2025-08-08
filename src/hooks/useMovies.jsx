import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const API_URL = import.meta.env.VITE_DATABASE_URL;

export const useMovies = () => {
	const [user] = useAuthState(auth);
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Use useCallback to memoize the fetch function, preventing re-creation on every render
	const fetchMovies = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const token = await user.getIdToken();
			const response = await fetch(`${API_URL}/movies.json?auth=${token}`);
			if (!response.ok) {
				console.log(response)
				throw new Error(
					"Failed to fetch movies. Please check your database URL."
				);
			}
			const data = await response.json();

			// Firebase returns null for empty paths, or an object of objects if data exists
			const loadedMovies = [];
			if (data) {
				for (const key in data) {
					loadedMovies.push({
						id: key,
						title: data[key].title,
						uid: data[key].uid,
						authorName: data[key].authorName,
					});
				}
			}
			setMovies(loadedMovies.reverse()); // Show newest first
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch movies on initial component mount
	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	// Function to add a movie
	const addMovie = async (title) => {
		if (!user) {
			throw new Error("You must be logged in to add a movie.");
		}

		// Get the user's ID token to make an authenticated request
		const token = await user.getIdToken();
		const response = await fetch(`${API_URL}/movies.json?auth=${token}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: title,
				uid: user.uid,
				authorName: user.displayName || "Anonymous",
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to add movie.");
		}

		// Refetch movies to show the new one
		await fetchMovies();
	};

	// Function to delete a movie
	const deleteMovie = async (movieId) => {
		if (!user) {
			throw new Error("You must be logged in to delete a movie.");
		}

		const token = await user.getIdToken();
		const response = await fetch(
			`${API_URL}/movies/${movieId}.json?auth=${token}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error || "Failed to delete movie. Check security rules."
			);
		}

		// Refetch movies to reflect the deletion
		await fetchMovies();
	};

	// Return all state and functions needed by the UI
	return { movies, loading, error, addMovie, deleteMovie, user };
};
