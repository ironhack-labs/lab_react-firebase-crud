import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  if (user === null) navigate("/login");

  return (
    <>
      {loading && <p>Loading...</p>}
      {user && props.children}
    </>
  );
}

export default ProtectedRoute;
