import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
