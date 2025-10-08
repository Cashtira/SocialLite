import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext.jsx";
import ReelCard from "../components/ReelCard.jsx";

export default function Reels() {
  const { posts, toggleLike, addComment, removePost } = useContext(PostContext);
  const reels = posts.filter((p) => p.type === "reel");

  // ❗ Khi vào trang Reels: chặn scroll ngoài body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="
        h-[calc(100vh-5rem)]       /* vừa đủ trừ navbar ~80px */
        -mt-20                     /* đẩy lên để reel bắt đầu ngay dưới navbar */
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
              h-[calc(100vh-5rem)]   /* ✅ đảm bảo mỗi reel chiếm đúng chiều cao */
              snap-start
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <ReelCard
              post={post}
              onLike={toggleLike}
              onAddComment={addComment}
              onDelete={removePost}
            />
          </div>
        ))
      )}
    </div>
  );
}
