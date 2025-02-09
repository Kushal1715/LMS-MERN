import CommonForm from "@/components/common-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signUpFormControls } from "@/config";
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

          <TabsContent value="signin">signin</TabsContent>
          <TabsContent value="signup">
            <CommonForm formControls={signUpFormControls} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
