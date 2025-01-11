import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useGetUser } from "../../../hooks";
import { useNavigate } from "react-router-dom";

interface AdminProtectedProps {
  children: ReactNode;
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const user = useGetUser(); // Redux'dan foydalanuvchini olish
  const navigate = useNavigate(); // React Router navigatsiyasi

  useEffect(() => {
    if (!user) {
      // Login qilmagan foydalanuvchilar uchun
      toast.error("Iltimos birinchi login qiling");
      navigate("/admin-login"); // Login sahifasiga yo‘naltirish
    }
  }, [user, navigate]);

  // Foydalanuvchi login qilgan bo‘lsa, bolalar komponentini qaytaradi
  return <>{children}</>;
};
