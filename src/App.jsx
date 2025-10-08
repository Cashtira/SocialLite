import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Upload from "./pages/Upload";
import Live from "./pages/Live";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 mt-16">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/live" element={<Live />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;