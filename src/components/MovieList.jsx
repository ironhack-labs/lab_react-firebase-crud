import { useState } from "react";
import useMovies from "../hooks/useMovies";
function PostList() {
  const { movies, loading, addMovie, deleteMovie, editMovie, user } =
    useMovies();
  const [content, setContent] = useState("");
  const [editMovieId, setEditMovieId] = useState("");
  const [editMovieTitle, setEditMovieTitle] = useState("");

  const handleEdit = (movie) => {
    setEditMovieId(movie.id);
    setEditMovieTitle(movie.title);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMovie(content);
          setContent("");
        }}
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>

      {!loading &&
        movies.map((movie) => {
          return movie.id === editMovieId ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editMovie(editMovieTitle, editMovieId);
                setEditMovieId("");
                setEditMovieTitle("");
              }}
            >
              <input
                type="text"
                value={editMovieTitle}
                onChange={(e) => setEditMovieTitle(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div key={movie.id}>
              {movie.title}
              {user.uid == movie.uid && (
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              )}
              {user.uid == movie.uid && (
                <button onClick={() => handleEdit(movie)}>Edit</button>
              )}
            </div>
          );
        })}
    </>
  );
}
export default PostList;
