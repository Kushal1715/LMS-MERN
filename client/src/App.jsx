import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import CommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/Student/Home";
import NotFound from "./pages/not-found";
import AddNewCourse from "./pages/instructor/add-new-course";
import StudentViewCoursePage from "./pages/Student/courses";
import StudentViewCourseDetailsPage from "./pages/Student/course-details";
import StudentPaymentSuccess from "./pages/Student/payment-return";
import StudentPaidCourses from "./pages/Student/student-paid-courses";
function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            isAuthenticated={auth.isAuthenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            isAuthenticated={auth.isAuthenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/add-new-course"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            isAuthenticated={auth.isAuthenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            isAuthenticated={auth.isAuthenticated}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/"
        element={
          <RouteGuard
            element={<CommonLayout />}
            isAuthenticated={auth.isAuthenticated}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="/home" element={<StudentHomePage />} />
        <Route path="/course" element={<StudentViewCoursePage />} />
        <Route
          path="/courses/course-details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="/payment-return" element={<StudentPaymentSuccess />} />
        <Route path="/student-paid-courses" element={<StudentPaidCourses />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
