import { useState } from "react";

export default function CommentBox({ postId, comments = [], onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      user: "You",
      text: text.trim(),
      createdAt: new Date().toLocaleString(),
    };
    onAdd(postId, newComment);
    setText("");
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Viết bình luận..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-lg">
          Gửi
        </button>
      </form>

      <div className="space-y-2 max-h-40 overflow-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có bình luận</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="text-sm">
              <span className="font-semibold mr-2">{c.user}</span>
              <span className="text-gray-700">{c.text}</span>
              <div className="text-xs text-gray-400">{c.createdAt}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
