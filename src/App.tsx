import { Route, Routes } from "react-router-dom";
import { Admin, AdminLogin, Home, LibraryActivities, LocalNew } from "./pages";
import { AdminDashboard } from "./components";
import { Toaster } from "react-hot-toast";
import { AdminLoginProtected, AdminProtected } from "./pages/admin";

export const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library-activities" element={<LibraryActivities />} />
        <Route path="/local-news" element={<LocalNew />} />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Admin />
            </AdminProtected>
          }
        />
        <Route
          path="/admin-login"
          element={
            <AdminLoginProtected>
              <AdminLogin />
            </AdminLoginProtected>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};
