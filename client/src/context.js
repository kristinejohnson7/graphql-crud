import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [house, setHouse] = useState("");
  const [userId, setUserId] = useState(0);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        age,
        setAge,
        username,
        setUsername,
        house,
        setHouse,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
