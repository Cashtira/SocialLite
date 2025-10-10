import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

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
          <Route path="/reels" element={<Reels />} />
          <Route path="/live" element={<Live />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

// TO DO: Thêm tim, cmt cho live.

export default App;