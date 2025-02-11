import { signInInitialValue, signUpInitialValue } from "@/config";
import { registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(signInInitialValue);
  const [signUpFormData, setSignUpFormData] = useState(signUpInitialValue);

  const registerUser = async (e) => {
    e.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
