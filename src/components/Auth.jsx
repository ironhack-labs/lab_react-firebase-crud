import { useAuth } from "../hooks/useAuth";

const Auth = () => {
	const [user, loading, signInWithGoogle, signOutUser] = useAuth();

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			{user ? (
				<>
					<span>Welcome, {user.displayName}!</span>
					<button onClick={signOutUser} style={{ marginLeft: "10px" }}>
						Sign Out
					</button>
				</>
			) : (
				<button onClick={signInWithGoogle}>Sign in with Google</button>
			)}
		</div>
	);
};

export default Auth;
