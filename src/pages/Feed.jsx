import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext.jsx";
import PostCard from "../components/PostCard";

export default function Feed() {
  const { posts, addPost, toggleLike, addComment, removePost } = useContext(PostContext);

  // form state
  const [caption, setCaption] = useState("");
  const [fileData, setFileData] = useState(null); // data URL
  const [mediaType, setMediaType] = useState(null); // "image" | "video" | null
  const [isReel, setIsReel] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFileData(dataUrl);
      if (file.type.startsWith("image/")) setMediaType("image");
      else if (file.type.startsWith("video/")) setMediaType("video");
      else setMediaType(null);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setCaption("");
    setFileData(null);
    setMediaType(null);
    setIsReel(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // rules:
    // - if isReel === true => must have a video (mediaType === "video")
    // - if isReel === false => can have image or video or none (text-only)
    if (isReel && mediaType !== "video") {
      return alert("Reel phải là video. Vui lòng chọn file video.");
    }
    if (!caption.trim() && !fileData) {
      return alert("Vui lòng nhập nội dung hoặc chọn ảnh/video.");
    }

    const type = isReel ? "reel" : mediaType ? mediaType : "text";

    const newPost = {
      id: crypto.randomUUID(),
      user: "Minh Kha",
      caption: caption.trim(),
      media: fileData,
      type,
      likes: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toLocaleString(),
    };

    addPost(newPost);
    resetForm();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Post form */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-3">Tạo bài viết</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Bạn đang nghĩ gì..."
            className="w-full border rounded-lg p-3 min-h-[80px]"
          />

          <div className="flex items-center gap-3">
            <input type="file" accept="image/*,video/*" onChange={handleFile} />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isReel}
                onChange={(e) => setIsReel(e.target.checked)}
                className="mr-1"
              />
              Đăng dưới dạng Reel (chỉ video)
            </label>
            <div className="ml-auto text-xs text-gray-500">
              {mediaType ? mediaType.toUpperCase() : "No media"}
            </div>
          </div>

          {fileData && mediaType === "image" && (
            <img src={fileData} alt="preview" className="w-full rounded-lg" />
          )}
          {fileData && mediaType === "video" && (
            <video src={fileData} controls className="w-full rounded-lg" />
          )}

          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Đăng
            </button>
            <button type="button" onClick={resetForm} className="px-4 py-2 border rounded-lg">
              Hủy
            </button>
          </div>
        </form>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có bài đăng nào.</p>
        ) : (
          posts
          .filter((p) => p.type !== "reel")
          .map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={(id) => toggleLike(id)}
              onAddComment={(postId, comment) => addComment(postId, comment)}
              onDelete={(id) => {
                if (confirm("Xác nhận xóa bài?")) removePost(id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}