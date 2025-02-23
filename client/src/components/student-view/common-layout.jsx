import React from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "./header";

const CommonLayout = () => {
  return (
    <div>
      <StudentHeader /> <Outlet />
    </div>
  );
};

export default CommonLayout;
