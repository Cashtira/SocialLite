import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likedByMe: !p.likedByMe, likes: p.likedByMe ? p.likes - 1 : p.likes + 1 }
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