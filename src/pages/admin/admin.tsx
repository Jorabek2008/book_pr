import { Button, Image } from "@nextui-org/react";
import { FaFileDownload, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import { IoIosNotifications } from "react-icons/io";
import { IoExitSharp } from "react-icons/io5";
import { useState } from "react";
import { AdminDashboard, PostBooks } from "../../components";

export const Admin = () => {
  const ADMIN_MOCK = [
    {
      id: 1,
      name: "Dashboard",
      shares: "/dashboard",
      icon: <MdDashboard size={20} />,
    },
    {
      id: 2,
      name: "Kitob yuklash",
      shares: "/postBooks",
      icon: <FaFileDownload size={20} />,
    },
    {
      id: 3,
      name: "Foydalanuvchilar",
      shares: "/users",
      icon: <FaUser size={20} />,
    },
    {
      id: 4,
      name: "Aktiv holati",
      shares: "/active",
      icon: <VscVmActive size={20} />,
    },
    {
      id: 5,
      name: "Bildirishnoma",
      shares: "/notification",
      icon: <IoIosNotifications size={20} />,
    },
  ];
  const [active, setActive] = useState("/dashboard");
  return (
    <div>
      <div className="w-full h-[80px] flex justify-between items-center py-2">
        <div className="w-[62px] h-[54px] mx-auto">
          <Image src="/logo.png" alt="logo" />
        </div>
        <Button className="bg-primary text-white mr-20 rounded-[40px]">
          Logout <Image src="/user.png" className="w-[35px] h-[35px] ml-2" />
        </Button>
      </div>
      <div className="flex gap-4 h-full">
        <div className="flex flex-col gap-4 w-[290px] ml-7 bg-[#D4D4D8] px-4 pb-4 pt-[68px] rounded-2xl">
          {ADMIN_MOCK.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActive(item.shares)}
              className={`flex items-center justify-start text-[20px] hover:bg-primary transition-all duration-300 ease-linear text-black hover:text-white rounded-lg p-2 ${active === item.shares ? "bg-primary text-white" : ""}`}
            >
              <div className="flex gap-3 items-center">
                <div>{item.icon}</div>
                <p>{item.name}</p>
              </div>
            </Button>
          ))}
          <Button
            className={`flex items-center justify-start text-[20px] hover:bg-primary transition-all duration-300 ease-linear text-black hover:text-white rounded-lg p-2`}
          >
            <div className="flex gap-3 items-center">
              <div>
                <IoExitSharp />
              </div>
              <p>Chiqish</p>
            </div>
          </Button>
        </div>
        <div className="flex w-full pr-[51px]">
          <div className="w-[2px] bg-[#FA9E93] h-full mr-4"></div>
          <div className="w-full">
            {active === "/dashboard" && <AdminDashboard />}
            {active === "/postBooks" && <PostBooks />}
          </div>
        </div>
      </div>
    </div>
  );
};
