import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  const base = "px-3 py-2 rounded-lg font-medium transition-colors duration-200";
  const active = "bg-blue-600 text-white hover:bg-blue-600";
  const inactive = "text-gray-700 hover:bg-blue-100 hover:text-blue-700";

  const handleLogout = () => {
    logout();
    navigate("/login"); // về trang login
  };

  // Nếu chưa đăng nhập, không hiển thị navbar chính
  if (!currentUser) return null;

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

        {/* Links */}
        <div className="flex gap-2 items-center">
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

          {/* Nút đăng xuất */}
          <button
            onClick={handleLogout}
            className="ml-3 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}