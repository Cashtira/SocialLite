import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-3 py-2 rounded-lg font-medium transition-colors duration-200";
  const active =
    "bg-blue-600 text-white hover:bg-blue-600";
  const inactive =
    "text-gray-700 hover:bg-blue-100 hover:text-blue-700";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-700 select-none"
        >
          SocialLite
        </NavLink>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            🏠 Feed
          </NavLink>

          <NavLink
            to="/reels"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            🎬 Reels
          </NavLink>

          <NavLink
            to="/live"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            📡 Live
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            👤 Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}