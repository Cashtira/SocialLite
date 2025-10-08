import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Import các trang
import Feed from "./pages/Feed.jsx";
import Reels from "./pages/Reels.jsx";
import Live from "./pages/Live.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20 max-w-3xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Feed />} />
         <Route
            path="/reels"
            element={
            <div className="pt-20 w-full px-0">
              <Reels />
            </div>
            }
          />

          <Route path="/live" element={<Live />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;