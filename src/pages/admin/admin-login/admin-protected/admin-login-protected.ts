import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useGetUser } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

interface AdminLoginProtectedProps {
  children: ReactNode;
}

export const AdminLoginProtected = ({ children }: AdminLoginProtectedProps) => {
  const user = useGetUser(); // Redux'dan foydalanuvchini olish
  const navigate = useNavigate(); // React Router navigatsiyasi

  useEffect(() => {
    if (user) {
      // Login qilingan foydalanuvchilar uchun
      toast.success("Siz allaqachon login qilgansiz");
      navigate("/admin"); // Admin sahifasiga yo‘naltirish
    }
  }, [user, navigate]);

  if (user) {
    // Login qilingan foydalanuvchilarni admin sahifasiga o‘tkazgan bo‘lsa, tarkibni ko‘rsatmaydi
    return null;
  }

  // Login qilmagan foydalanuvchilar uchun bolalar komponentlarini ko‘rsatish
  return children;
};
