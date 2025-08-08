import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, signOutUser } from "../config/firebase";

export const useAuth = () => {
	const [user, loading] = useAuthState(auth);
	return [user, loading, signInWithGoogle, signOutUser]
};