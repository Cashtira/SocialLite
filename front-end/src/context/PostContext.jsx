import { createContext, useState, useEffect } from "react";
import { mockPosts } from "../data/mockPosts";
import { mockUsers } from "../data/mockUsers";

export const PostContext = createContext();

export function PostProvider({ children }) {
  // 🧠 Gắn thông tin user vào mỗi post
  const attachUserData = (posts) =>
  posts.map((post) => {
    const user = mockUsers.find((u) => String(u.id) === String(post.userId)) || {};
    return {
      ...post,
      user,
      userName: user.name || "Người dùng ẩn danh",
      userAvatar: user.avatar || "https://i.pravatar.cc/100",
      username: user.username || "unknown",
    };
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      console.log("🗂️ Load từ localStorage");
      return JSON.parse(saved);
    } else {
      console.log("🌱 Load từ mockPosts");
      return attachUserData(mockPosts);
    }
  });

  // Lưu xuống localStorage mỗi khi posts thay đổi
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Log kiểm tra xem posts có load không
  useEffect(() => {
    console.log("📦 Posts hiện tại:", posts);
  }, [posts]);

  const addPost = (post) => {
  setPosts((prev) => {
    // Gắn thông tin user cho bài viết mới
    const enrichedPost = attachUserData([post])[0];
    return [enrichedPost, ...prev];
  });
};


  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const addComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [comment, ...(p.comments || [])] }
          : p
      )
    );
  };

  const toggleCommentLike = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      likedByMe: !c.likedByMe,
                      likes: c.likedByMe ? c.likes - 1 : c.likes + 1,
                    }
                  : c
              ),
            }
          : p
      )
    );
  };

  const removePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        toggleLike,
        addComment,
        toggleCommentLike,
        removePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}