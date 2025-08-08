import { Link, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import "./style.css";
import WatchListPage from "./pages/WatchListPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<div className="App">
			<NavBar>
				<h1>Movie watchlist app</h1>
				<Link to="/">Home</Link> | <Link to="/watchlist">My Watchlist</Link>
				<Auth />
			</NavBar>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/watchlist"
						element={
							<ProtectedRoute>
								<WatchListPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
