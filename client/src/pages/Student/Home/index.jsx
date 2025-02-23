import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import React, { useContext } from "react";

const StudentHomePage = () => {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 p-6">
        <section className="lg:w-1/3">
          <div className="flex flex-col justify-center items-center lg:justify-start gap-4">
            <h1 className="text-5xl font-extrabold">Learning that gets you</h1>
            <p className="text-xl">
              Skills for your present and your future. Get started with us
            </p>
          </div>
        </section>
        <section className="lg:w-2/3">
          <div className="">
            <img src="/banner-img.png" className="rounded-lg" />
          </div>
        </section>
      </div>
      <section className="bg-gray-300 mt-12 p-6">
        <h1 className="font-bold text-3xl">Course Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
      </section>
    </main>
  );
};

export default StudentHomePage;
