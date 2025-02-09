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
import { GraduationCap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
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
                <CommonForm formControls={signInFormControls} />
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
                <CommonForm formControls={signUpFormControls} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
