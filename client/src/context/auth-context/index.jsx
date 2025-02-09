import { signInInitialValue, signUpInitialValue } from "@/config";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(signInInitialValue);
  const [signUpFormData, setSignUpFormData] = useState(signUpInitialValue);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
