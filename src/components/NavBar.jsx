import { Link, useLocation } from "react-router-dom";
import Auth from "./Auth";

function NavBar() {
	const location = useLocation()
	const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
		<nav className="navbar">
			<h1>Movie watchlist app</h1>
			<div className="navbar_menu">
				<Link to="/" className={`navbar_link ${isActive("/")}`}>
					Home
				</Link>
				<Link
					to="/watchlist"
					className={`navbar_link ${isActive("/watchlist")}`}
				>
					My Watchlist
				</Link>
				<Auth />
			</div>
		</nav>
  );
}

export default NavBar