import MovieList from "../components/MovieList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function WatchListPage() {
  const [user] = useAuthState(auth);
  return (
    <>
      <p>Hi {user.displayName}</p>
      <MovieList />
      <Link to="/homePage">
        <button>Home</button>
      </Link>
    </>
  );
}

export default WatchListPage;
