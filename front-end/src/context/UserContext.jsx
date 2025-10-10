import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: "user-1",
    name: "Minh Kha",
    avatar: "https://i.pravatar.cc/150?u=minhkha",
    bio: "Dev đam mê sáng tạo",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
