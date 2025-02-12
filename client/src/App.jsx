import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboard from "./pages/instructor";
import CommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/Student/Home";
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
            element={<InstructorDashboard />}
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
        <Route path="home" element={<StudentHomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
