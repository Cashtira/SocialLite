import { useEffect } from "react";
import { usePosts } from "../hooks/usePost.js";
import ReelCard from "../components/ReelCard.jsx";

export default function Reels() {
  const { posts, toggleLike, addComment, toggleCommentLike, removePost } = usePosts();
  const reels = posts.filter((p) => p.type === "reel");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="
        h-[calc(100vh-5rem)]       
        overflow-y-scroll
        snap-y snap-mandatory
        scrollbar-none
        flex flex-col
      "
    >
      {reels.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Chưa có reel nào.</p>
      ) : (
        reels.map((post) => (
          <div
            key={post.id}
            className="
              h-[calc(100vh-5rem)]
              snap-start
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <ReelCard
              post={post}
              onLike={toggleLike}
              onAddComment={addComment}
              onToggleCommentLike={toggleCommentLike}
              onDelete={removePost}
            />
          </div>
        ))
      )}
    </div>
  );
}