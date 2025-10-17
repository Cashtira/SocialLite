import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: "user-1",
    name: "Seiun Sky",
    avatar: "/img/seiunSkyAvatar.png",
    bio: "Rod and Fish, you want some?",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}