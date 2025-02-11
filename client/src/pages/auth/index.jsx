import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    registerUser,
  } = useContext(AuthContext);

  const validateSignInForm = () => {
    return (
      signInFormData &&
      signInFormData.email !== "" &&
      signInFormData.password !== ""
    );
  };

  const validateSignUpForm = () => {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.email !== "" &&
      signUpFormData.password !== ""
    );
  };

  console.log(signInFormData, "signin");
  console.log(signUpFormData, "signup");

  return (
    <div className="max-h-screen p-6">
      <header>
        <Link to="/">
          <div className="flex items-center gap-4">
            <GraduationCap size={30} />
            <span className="font-extrabold text-xl">LMS LEARN</span>
          </div>
        </Link>
      </header>
      <div className="h-screen flex items-center justify-center">
        <Tabs defaultValue="signin" className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Please enter email and password to sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signInFormControls}
                  buttonText="Sign In"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisable={!validateSignInForm()}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Please enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisable={!validateSignUpForm()}
                  handleSubmit={registerUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
