import { useState } from "react";
import CommentBox from "./CommentBox";

export default function PostCard({ post, onLike, onAddComment, onDelete }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="border rounded-2xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">😎</div>
          <div>
            <p className="font-semibold text-gray-800">{post.user || "Người dùng ẩn danh"}</p>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">{post.type}</div>
      </div>

      <p className="mb-3 text-gray-700">{post.caption}</p>

      {post.media && (
        post.type === "image" ? (
          <img src={post.media} alt="post" className="w-full rounded-lg mb-3" />
        ) : (
          <video src={post.media} controls className="w-full rounded-lg mb-3" />
        )
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 font-medium transition-transform duration-150 active:scale-110 ${
            post.likedByMe ? "text-red-500" : "text-gray-600"
          }`}
        >
          <span>{post.likedByMe ? "♥" : "♡"}</span>
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => setShowComments((s) => !s)}
          className="text-gray-600 font-medium"
        >
          💬 {post.comments?.length ?? 0}
        </button>

        <button
          onClick={() => onDelete(post.id)}
          className="ml-auto text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Xóa
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <CommentBox postId={post.id} comments={post.comments ?? []} onAdd={onAddComment} />
        </div>
      )}
    </article>
  );
}