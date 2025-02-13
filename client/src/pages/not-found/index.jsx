import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-extrabold gap-4">
      <h1 className="text-red-500 text-5xl">Error 404</h1>
      <p className="text-5xl">Page Not Found</p>
    </div>
  );
};

export default NotFound;
