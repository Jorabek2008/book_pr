import { Button, Image } from "@nextui-org/react";
import { FaFileDownload, FaUpload } from "react-icons/fa";
import { MdDashboard, MdNotifications } from "react-icons/md";
import { IoExitSharp, IoPeopleSharp, IoPush } from "react-icons/io5";
import { useState } from "react";
import { AdminDashboard, Bibliography, PostBooks } from "../../components";
import { Link } from "react-router-dom";
import { PostPosts } from "../../components/post-posts";
import { PostStaff } from "../../components/post-staff";
import { Notification } from "../../components/notification";
import { api } from "../../api";

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
      name: "Post yuklash",
      shares: "/postPosts",
      icon: <FaUpload size={20} />,
    },
    {
      id: 4,
      name: "Xodim yuklash",
      shares: "/postStaff",
      icon: <IoPeopleSharp size={20} />,
    },
    {
      id: 5,
      name: "Bibliography yuklash",
      shares: "/bibliograph",
      icon: <IoPush size={20} />,
    },
    {
      id: 6,
      name: "Xabarlar",
      shares: "/notification",
      icon: <MdNotifications size={20} />,
    },
  ];
  const [active, setActive] = useState("/dashboard");

  const logOutBtn = async () => {
    try {
      await api.get("/auth/logout");
      window.location.href = "/";
      localStorage.removeItem("userId");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full h-[80px] flex justify-between items-center py-2 px-4 sm:px-8">
        <div className="w-[62px] h-[54px]">
          <Link to={"/"}>
            <Image src="/logotip.jpg" alt="logo" className="w-16 h-16" />
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Image src="/user1.png" className="w-[35px] h-[35px] ml-2" />
          <Button
            onClick={logOutBtn}
            className="bg-primary text-white rounded-[40px] px-4 py-2 hidden sm:flex"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 h-full mt-10">
        <div className="flex flex-col gap-4 w-full sm:w-[290px] bg-[#D4D4D8] px-4 pb-4 pt-[68px] rounded-2xl sm:ml-7">
          {ADMIN_MOCK.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActive(item.shares)}
              className={`flex items-center justify-start text-[18px] sm:text-[20px] hover:bg-primary transition-all duration-300 ease-linear text-black hover:text-white rounded-lg p-2 ${active === item.shares ? "bg-primary text-white" : ""}`}
            >
              <div className="flex gap-3 items-center">
                <div>{item.icon}</div>
                <p>{item.name}</p>
              </div>
            </Button>
          ))}
          <Button
            onClick={logOutBtn}
            className={`flex items-center justify-start text-[18px] sm:text-[20px] hover:bg-primary transition-all duration-300 ease-linear text-black hover:text-white rounded-lg p-2`}
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
          <div className="w-[2px] bg-[#FA9E93] h-full mr-4 hidden sm:block"></div>
          <div className="w-full">
            {active === "/dashboard" && <AdminDashboard />}
            {active === "/postBooks" && <PostBooks />}
            {active === "/postPosts" && <PostPosts />}
            {active === "/postStaff" && <PostStaff />}
            {active === "/notification" && <Notification />}
            {active === "/bibliograph" && <Bibliography />}
          </div>
        </div>
      </div>
    </div>
  );
};
