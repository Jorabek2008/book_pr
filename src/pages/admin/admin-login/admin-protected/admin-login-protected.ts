import { ReactNode } from "react";
import toast from "react-hot-toast";

interface AdminLoginProtectedProps {
  children: ReactNode;
}

export const AdminLoginProtected = ({ children }: AdminLoginProtectedProps) => {
  const isLoggedIn = localStorage.getItem("userId");

  if (!isLoggedIn) {
    toast.error("Please login first");
    return children;
  }
  if (isLoggedIn) {
    toast.success("You are already logged in");
    location.replace("/admin");
  }
};
