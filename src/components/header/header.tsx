import { Link } from "react-router-dom";
import { HEADER_MOCK } from "../../mock";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Image } from "@nextui-org/react";

interface HeaderProps {
  name: string;
  share: string;
  id: number;
}
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="max-w-[1220px] mx-auto px-7">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              <Image src="/logosher.jpg" alt="logo" className="w-16 h-16" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-[31px]">
            {HEADER_MOCK.map((item: HeaderProps) => (
              <Link
                to={item.share}
                key={item.id}
                className={`${location.pathname === item.share ? "text-white bg-black rounded-2xl p-2" : ""} p-1 poppins-regular`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-[16px] font-medium text-blue-500">
              <Link to={"/admin-login"}>Admin</Link>
            </h1>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <AiOutlineClose size={25} />
              ) : (
                <AiOutlineMenu size={25} />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col items-center md:hidden">
            {HEADER_MOCK.map((item) => (
              <Link to={item.share} key={item.id} className="py-2">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
