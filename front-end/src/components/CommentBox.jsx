import { useState } from "react";
import { useUser } from "../hooks/useUser.js";

export default function CommentBox({ postId, comments = [], onAdd, onToggleLike }) {
  const { currentUser } = useUser();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      userName: currentUser.name,
      avatar: currentUser.avatar, 
      text: text.trim(),
      createdAt: new Date().toLocaleString(),
      likes: 0,
      likedByMe: false,
    };

    onAdd(postId, newComment);
    setText("");
  };

  return (
    <div className="space-y-3">
      {/* Danh sách bình luận */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg"
          >
            <img
              src={c.avatar || "https://i.pravatar.cc/40"}
              alt={c.userName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{c.userName}</span>
                <button
                  onClick={() => onToggleLike(postId, c.id)}
                  className="text-xs transition-transform hover:scale-110"
                >
                  {c.likedByMe ? "❤️" : "🤍"} {c.likes}
                </button>
              </div>
              <p className="text-sm">{c.text}</p>
              <p className="text-xs text-gray-400">{c.createdAt}</p>
            </div>
          </div>
        ))
      )}

      {/* Form bình luận */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Viết bình luận..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}