import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedRoute = ({ children }) => {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return <div>Loading session...</div>;
	}

	if (!user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to. This is a good UX practice.
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
