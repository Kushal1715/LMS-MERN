import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { BarChart, Book, LogOut } from "lucide-react";
import React, { useContext, useState } from "react";

const InstructorDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <div className="h-screen w-full bg-gray-200 flex">
      <aside className="h-full bg-gray-50 px-4 py-6 w-96 hidden xl:block shadow-lg">
        <h1 className="font-extrabold text-3xl mb-8">Instructor View</h1>
        <nav>
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem.value}
              className="w-full flex items-center justify-start mb-4 text-xl"
              onClick={
                menuItem.component === null
                  ? handleLogout
                  : () => setCurrentTab(menuItem.value)
              }
              variant={menuItem.value === currentTab ? "secondary" : "ghost"}
            >
              <menuItem.icon />
              {menuItem.label}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="p-6 flex-1">
        <h1 className="font-extrabold text-4xl mb-6">Dashboard</h1>
        <div>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.component === null ? null : menuItem.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
