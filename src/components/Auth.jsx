import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  if (user !== null) {
    navigate("/homePage");
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user === null && (
        <button
          onClick={async () => {
            await signInWithGoogle();
            navigate("/homePage");
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default Auth;
