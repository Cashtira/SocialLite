import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/"); // quay về trang chính sau khi đăng
    window.location.reload(); // đảm bảo context reload user
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Chọn tài khoản để đăng nhập</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mockUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => handleLogin(user)}
            className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="text-left">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}