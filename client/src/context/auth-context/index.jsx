import { signInInitialValue, signUpInitialValue } from "@/config";
import { loginService, registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(signInInitialValue);
  const [signUpFormData, setSignUpFormData] = useState(signUpInitialValue);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const data = await registerService(signUpFormData);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(signInFormData);
    const data = await loginService(signInFormData);
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
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
