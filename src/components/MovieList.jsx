import { useState } from "react";
import { useMovies } from "../hooks/useMovies";

const MovieList = () => {
	const { movies, loading, error, addMovie, deleteMovie, user } = useMovies();
	const [newMovieTitle, setNewMovieTitle] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMovieTitle.trim()) {
			try {
				await addMovie(newMovieTitle);
				setNewMovieTitle("");
			} catch (err) {
				alert(err.message);
			}
		}
	};

	return (
		<div>
			{user && (
				<form onSubmit={handleSubmit} className="add-movie-form">
					<h3>Add a Movie to the Wishlist</h3>
					<input
						type="text"
						value={newMovieTitle}
						onChange={(e) => setNewMovieTitle(e.target.value)}
						placeholder="e.g., The Matrix"
					/>
					<button type="submit">Add Movie</button>
				</form>
			)}

			<h2>Movie Wishlist</h2>
			{loading && <p>Loading movies...</p>}
			{error && <p style={{ color: "red" }}>Error: {error}</p>}
			{!loading && !error && (
				<ul className="movie-list">
					{movies.length === 0 ? (
						<p>No movies in the wishlist yet. Add one!</p>
					) : (
						movies.map((movie) => (
							<li key={movie.id}>
								<span>
									<strong>{movie.title}</strong> (Added by:{" "}
									{movie.authorName})
								</span>
								{/* Show delete button only if the logged-in user is the author */}
								{user && user.uid === movie.uid && (
									<button
										onClick={() => deleteMovie(movie.id)}
										className="delete-btn"
									>
										Delete
									</button>
								)}
							</li>
						))
					)}
				</ul>
			)}
		</div>
	);
};

export default MovieList;
