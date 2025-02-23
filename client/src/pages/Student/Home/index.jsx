import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config";
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
      <section className="bg-gray-300 mt-12 px-6 pt-12 pb-20">
        <h1 className="font-bold text-3xl">Course Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {courseCategories && courseCategories.length > 0
            ? courseCategories.map((category) => (
                <div
                  key={category.id}
                  className="py-2 px-4 bg-white font-semibold rounded-lg cursor-pointer"
                >
                  {category.label}
                </div>
              ))
            : null}
        </div>
      </section>
    </main>
  );
};

export default StudentHomePage;
