import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">SocialLite 🎥</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-500">Feed</Link>
        <Link to="/upload" className="hover:text-blue-500">Upload</Link>
        <Link to="/live" className="hover:text-blue-500">Live</Link>
        <Link to="/profile" className="hover:text-blue-500">Profile</Link>
      </div>
    </nav>
  );
}