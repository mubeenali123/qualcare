import { BrowserRouter, Routes, Route } from "react-router-dom";
import Careers from "./pages/Careers";
import FinalApplicationForm from "./pages/Careers/FinalApplicationForm";
import FinalApplicationForm2 from "./pages/Careers/FinalApplicationForm2";
import FinalApplicationForm3 from "./pages/Careers/FinalApplicationForm3";
import FinalApplicationForm4 from "./pages/Careers/FinalApplicationForm4";
import FinalApplicationForm6 from "./pages/Careers/FinalApplicationForm6";
import LoginPage from "./pages/Careers/LoginPage";
import ProfilePage from "./pages/Careers/ProfilePage";
import ApplicationsPage from "./pages/Careers/ApplicationsPage";
import ChangePasswordPage from "./pages/Careers/ChangePasswordPage";
import ExpirationChecklist from "./pages/Careers/ExpirationChecklist";
import AdminLogin from "./pages/Careers/admin/AdminLogin";
import AdminLayout from "./pages/Careers/admin/AdminLayout";
import AdminDashboard from "./pages/Careers/admin/AdminDashboard";
import AdminApplicants from "./pages/Careers/admin/AdminApplicants";
import AdminApplications from "./pages/Careers/admin/AdminApplications";
import AdminProtectedRoute from "./pages/Careers/admin/AdminProtectedRoute";
import ApplicationDetail from "./pages/Careers/admin/ApplicationDetail";
import UserProtectedRoute from "./pages/Careers/UserProtectedRoute";
import AdminStatusLogs from "./pages/Careers/admin/AdminStatusLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
<Route element={<UserProtectedRoute />}>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-applications" element={<ApplicationsPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/expiration-checklist" element={<ExpirationChecklist />} />
      
      {/* 45-Page Form Steps */}
      <Route path="/final-form" element={<FinalApplicationForm />} />
      <Route path="/final-form-2" element={<FinalApplicationForm2 />} />
      <Route path="/final-form-3" element={<FinalApplicationForm3 />} />
      <Route path="/final-form-4" element={<FinalApplicationForm4 />} />
      <Route path="/final-form-6" element={<FinalApplicationForm6 />} />
    </Route>
      <Route path="/login" element={<LoginPage />} />
<Route path="/admin" element={<AdminLayout />}>

  <Route path="login" element={<AdminLogin />} />

  {/* Protected Routes */}
  <Route element={<AdminProtectedRoute />}>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="applicants" element={<AdminApplicants />} />
    <Route path="applications" element={<AdminApplications />} />
<Route path="applications/:id" element={<ApplicationDetail />} />
<Route path="status-logs" element={<AdminStatusLogs />} />
  </Route>

</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
