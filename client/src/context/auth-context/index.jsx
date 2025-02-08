import { createContext } from "react";

export const AuthContext = createContext(null);

export default AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
