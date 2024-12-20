import { ReactNode } from "react";
import toast from "react-hot-toast";

interface AdminProtectedProps {
  children: ReactNode;
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const isLoggedIn = localStorage.getItem("userId");

  if (!isLoggedIn) {
    toast.error("Please login first");
    location.replace("/admin-login");
  }
  if (isLoggedIn) {
    toast.error("You are already logged in");
    return children;
  }
};
