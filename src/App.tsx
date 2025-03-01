import { Route, Routes } from "react-router-dom";
import {
  Admin,
  AdminLogin,
  Home,
  LibraryActivities,
  LocalNew,
  Location,
  Management,
} from "./pages";
import { AdminDashboard } from "./components";
import { Toaster } from "react-hot-toast";
import { AdminLoginProtected, AdminProtected } from "./pages/admin";
import { userService } from "./redux/services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice/user";
import { OneBooks } from "./components/get-all-books/one-books";
import { OneAds } from "./components/ads/one-ads";

export const App = () => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const reponse = await userService();
      dispatch(setUser(reponse.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        <Route path="/one-book/:bookId" element={<OneBooks />} />
        <Route path="/one-ads/:adsId" element={<OneAds />} />
        <Route path="/location" element={<Location />} />
        <Route path="/management" element={<Management />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};
