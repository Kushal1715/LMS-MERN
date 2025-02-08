import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<AuthPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
