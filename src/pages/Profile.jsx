import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import { usePosts } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { posts, toggleLike, addComment, removePost } = usePosts();
  const { currentUser } = useUser();

  if (!currentUser) return <p>Đang tải...</p>;

  const myPosts = posts.filter((p) => p.userId === currentUser.id);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      {/* --- Hồ sơ người dùng --- */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{currentUser.name}</h2>
          <p className="text-gray-600 text-sm">{currentUser.bio}</p>
        </div>
      </div>

      {/* --- Danh sách bài đăng --- */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Bài viết của bạn</h3>
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={toggleLike}
              onAddComment={addComment}
              onDelete={removePost}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">Bạn chưa đăng bài nào.</p>
        )}
      </div>
    </div>
  );
}