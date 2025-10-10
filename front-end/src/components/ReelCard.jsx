import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentBox from "./CommentBox";

export default function ReelCard({
  post,
  onLike,
  onAddComment,
  onToggleCommentLike,
  onDelete,
}) {
  const [showComments, setShowComments] = useState(false);
  const [isVertical, setIsVertical] = useState(true);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Xác định hướng video (ngang/dọc)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const { videoWidth, videoHeight } = video;
      setIsVertical(videoHeight >= videoWidth);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Tự động play/pause khi scroll
  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            setShowComments(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="relative flex justify-center items-start w-full h-[calc(100vh-5rem)] snap-start"
    >
      <div
        className={`flex items-start transition-all duration-500 ${
          showComments ? "gap-4" : ""
        }`}
      >
        {/* --- Video container --- */}
        <div className="relative w-[360px] h-[640px] bg-black rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
          <div className="w-full h-full flex justify-center items-center">
            <video
              ref={videoRef}
              src={post.media}
              loop
              muted
              playsInline
              autoPlay
              className={`${
                isVertical
                  ? "w-full h-full object-cover"
                  : "object-contain transform rotate-90 scale-[1.78]"
              } transition-all duration-500`}
            />
          </div>

          {/* --- Gradient overlay --- */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* --- Avatar + username --- */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <span className="text-white font-semibold text-sm drop-shadow">
              @{post.userName}
            </span>
          </div>

          {/* --- Caption --- */}
          <div className="absolute bottom-16 left-4 text-white drop-shadow-md max-w-[70%]">
            <p className="text-sm opacity-90">{post.caption}</p>
          </div>

          {/* --- Action buttons --- */}
          <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 text-white drop-shadow-md">
            {/* ❤️ Like bài đăng */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex flex-col items-center ${
                post.likedByMe ? "text-red-500" : "text-white"
              }`}
            >
              <span className="text-3xl">
                {post.likedByMe ? "❤️" : "🤍"}
              </span>
              <span className="text-sm mt-1">{post.likes}</span>
            </button>

            {/* 💬 Bình luận */}
            <button
              onClick={() => setShowComments((s) => !s)}
              className="flex flex-col items-center"
            >
              <span className="text-3xl">💬</span>
              <span className="text-sm mt-1">{post.comments.length}</span>
            </button>

            {/* Xóa bài */}
            <button
              onClick={() => onDelete(post.id)}
              className="flex flex-col items-center text-gray-400 hover:text-red-500 text-2xl"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* --- Comment box --- */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              key="comments"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-[320px] bg-white rounded-2xl shadow-lg p-4 h-[640px] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Bình luận</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <CommentBox
                postId={post.id}
                comments={post.comments}
                onAdd={onAddComment}
                onToggleLike={onToggleCommentLike}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}