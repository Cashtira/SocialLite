import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts phải được dùng bên trong <PostProvider>");
  }
  return context;
}
