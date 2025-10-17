import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Feed from "./pages/Feed.jsx";
import Reels from "./pages/Reels.jsx";
import Live from "./pages/Live.jsx";
import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20 max-w-3xl mx-auto px-4">
        <Routes>
          {/* Trang login công khai */}
          <Route path="/login" element={<LoginPage />} />

          {/* Các trang yêu cầu đăng nhập */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="/reels"
            element={
              <PrivateRoute>
                <Reels />
              </PrivateRoute>
            }
          />
          <Route
            path="/live"
            element={
              <PrivateRoute>
                <Live />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;