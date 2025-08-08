import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import WatchListPage from "./pages/WatchListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";


function App() {
	return (
		<div className="App">
			<NavBar />
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
