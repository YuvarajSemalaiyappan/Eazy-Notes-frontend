import { createContext, useState } from "react";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [mailid, setmailid] = useState();

  const [forgotUser, setforgotUser] = useState();

  const [LoginPerson, setLoginPerson] = useState([]);

  const [notes, setNotes] = useState(["# Start your notes here"]);

  return (
    <UserContext.Provider
      value={{
        LoginPerson,
        setLoginPerson,
        mailid,
        setmailid,
        forgotUser,
        setforgotUser,
        notes,
        setNotes
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
