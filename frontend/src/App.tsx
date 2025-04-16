import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ProtectedWrapper from "./helpers/ProtectedWrapper";
import DataWrapper from "./helpers/DataWrapper";
import AuthenticationWrapper from "./helpers/AuthenticationWrapper";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/authentication/ResetPassword";
import Campaigns from "./pages/dashboard/referrals/Campaigns";
import Archived from "./pages/dashboard/referrals/Archived";
import ReferralAnalytics from "./pages/dashboard/analytics/ReferralAnalytics";
import ClientAnalytics from "./pages/dashboard/analytics/ClientAnalytics";
import Clients from "./pages/dashboard/Clients";
import Rewards from "./pages/dashboard/Rewards";
import Appointments from "./pages/dashboard/Appointments";
import Integrations from "./pages/dashboard/Integrations";
import Contact from "./pages/dashboard/support/Contact";
import Faq from "./pages/dashboard/support/Faq";
import Pending from "./pages/dashboard/referrals/Pending";

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
              <DataWrapper>
                <Dashboard />
              </DataWrapper>
            </ProtectedWrapper>
          }
        >
          <Route
            index
            element={<Navigate to="referrals/campaigns" replace />}
          />
          <Route path="referrals/campaigns" element={<Campaigns />} />
          <Route path="referrals/pending" element={<Pending />} />
          <Route path="referrals/archived" element={<Archived />} />
          <Route path="clients" element={<Clients />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="analytics/referrals" element={<ReferralAnalytics />} />
          <Route path="analytics/clients" element={<ClientAnalytics />} />
          <Route path="support/contact" element={<Contact />} />
          <Route path="support/faq" element={<Faq />} />
        </Route>

        <Route
          path="/reset-password"
          element={
            <ProtectedWrapper>
              <ResetPassword />
            </ProtectedWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
