import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WatchListPage from "./pages/WatchListPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
