import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Feed", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Live", path: "/live" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-2xl font-bold text-blue-600">SocialLite</h1>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`font-medium ${
                  pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
