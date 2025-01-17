import { useGetUser } from "../../hooks";
import { ChangePassword } from "../change-password";

export const AdminDashboard = () => {
  const user = useGetUser();
  return (
    <div className="flex flex-col lg:flex-row w-full px-4 sm:px-8 gap-3">
      <div className="gap-x-4 mt-4 w-full py-[13px] px-[10px] rounded-lg bg-gray-300">
        <h1 className="text-[18px] sm:text-[20px] font-medium">Informatsiya</h1>
        <div className="sm:flex-row gap-4 sm:gap-8">
          <h1 className="text-[16px] mt-1 sm:text-[18px]">
            <strong>Ism:</strong> {user?.username || "Admin"}
          </h1>
          <h1 className="text-[16px] mt-1 sm:text-[18px]">
            <strong>Email:</strong> {user?.email || "admin@example.com"}
          </h1>
        </div>
      </div>
      <ChangePassword />
    </div>
  );
};
