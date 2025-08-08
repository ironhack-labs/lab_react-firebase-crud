import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
	const [user] = useAuth()
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from || "/";

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [user, navigate, from]);

	return (
		<div>
			<h2>Login Required</h2>
			<p>Please sign in to view your watchlist.</p>
			<Auth/>
		</div>
	);
};

export default LoginPage;
