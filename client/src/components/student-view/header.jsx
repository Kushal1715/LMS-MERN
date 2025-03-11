import { GraduationCap, TvMinimalPlay } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

const StudentHeader = () => {
  const { resetCredentials } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <header className="px-6 py-6 border-b-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to="/home"
            className="flex items-center gap-4 font-extrabold text-2xl"
          >
            <GraduationCap className="h-8 w-8" />
            <span>LMS LEARN</span>
          </Link>
          <div className="">
            <Button
              variant="ghost"
              className="text-lg bg-gray-400"
              onClick={() => navigate("/course")}
            >
              Explore Courses
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <Link
              to="/student-paid-courses"
              className="flex items-center gap-2 font-extrabold text-2xl"
            >
              <span>My Courses</span>

              <TvMinimalPlay className="h-8 w-8" />
            </Link>
          </div>
          <div>
            <Button className="text-lg" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
