import { signInInitialValue, signUpInitialValue } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { isAxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

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
    const data = await loginService(signInFormData);
    if (data?.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data?.data?.accessToken)
      );
      setAuth({
        isAuthenticated: true,
        user: data?.data?.user,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  };

  const checkAuth = async () => {
    const data = await checkAuthService();
    console.log(data);
    if (data?.success) {
      setAuth({
        isAuthenticated: true,
        user: data?.data?.user,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(auth);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        registerUser,
        loginUser,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
