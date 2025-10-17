import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";
import PostCard from "../components/PostCard";
import { mockUsers } from "../data/mockUsers";

export default function Profile() {
  const { userId } = useParams();
  const { posts, toggleLike, addComment, toggleCommentLike, removePost } =
    usePosts();
  const { currentUser } = useUser();

  // Xác định user đang được xem  
  const profileUser =
  userId && currentUser?.id !== userId
    ? mockUsers.find((u) => u.id === userId) || null
    : currentUser;

  if (!profileUser) return <p className="text-center mt-10">Không tìm thấy người dùng.</p>;

  const userPosts = posts.filter((p) => p.userId === profileUser.id);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      {/* --- Hồ sơ người dùng --- */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
        <img
          src={profileUser.avatar}
          alt={profileUser.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{profileUser.name}</h2>
          <p className="text-gray-600 text-sm">{profileUser.bio}</p>
          {userId && currentUser?.id !== profileUser.id && (
            <button className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              + Theo dõi
            </button>
          )}
        </div>
      </div>

      {/* --- Danh sách bài đăng --- */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-3">
          {userId && currentUser?.id !== profileUser.id
            ? `Bài viết của ${profileUser.name}`
            : "Bài viết của bạn"}
        </h3>

        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={toggleLike}
              onAddComment={addComment}
              onToggleCommentLike={toggleCommentLike}
              onDelete={removePost}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            {userId && currentUser?.id !== profileUser.id
              ? "Người dùng này chưa có bài đăng nào."
              : "Bạn chưa đăng bài nào."}
          </p>
        )}
      </div>
    </div>
  );
}