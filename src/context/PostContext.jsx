import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

/**
 * Post structure:
 * {
 *   id: string,
 *   user: string,
 *   caption: string,
 *   media: string | null, // data URL or null
 *   type: "image" | "video" | "reel" | "text",
 *   likes: number,
 *   likedByMe: boolean,
 *   comments: [{ id, user, text, createdAt }],
 *   createdAt: string
 * }
 */

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts((p) => [post, ...p]);
  };

  const toggleLike = (postId) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByMe: !post.likedByMe,
              likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const addComment = (postId, comment) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === postId ? { ...post, comments: [comment, ...post.comments] } : post
      )
    );
  };

  const removePost = (postId) => {
    setPosts((p) => p.filter((post) => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, addComment, removePost }}>
      {children}
    </PostContext.Provider>
  );
}
