import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ProtectedWrapper from "./helpers/ProtectedWrapper";
import AuthenticationWrapper from "./helpers/AuthenticationWrapper";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/authentication/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route
          path="/login"
          element={
            <AuthenticationWrapper>
              <Login />
            </AuthenticationWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthenticationWrapper>
              <Register />
            </AuthenticationWrapper>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedWrapper>
              <Dashboard />
            </ProtectedWrapper>
          }
        />

        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
