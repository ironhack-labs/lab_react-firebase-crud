import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOutUser } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleMovieWatchList = () => {
    navigate("/watchlist");
  };
  return (
    <div>
      {
        <>
          <p>Hello You could always see list of movies here!!!</p>
          <p>Welcome {user.displayName}</p>
          <button onClick={signOutUser}> Sign Out</button>
        </>
      }
      <button onClick={handleMovieWatchList}>Movie watch list</button>
    </div>
  );
}
export default HomePage;
