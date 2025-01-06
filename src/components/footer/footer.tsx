import {
  FaFacebook,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaRegClock,
  FaTelegram,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <div>
      <div className="bg-[#030522]">
        <div className="max-w-[1220px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between py-2">
            <div className="w-full md:w-[320px] mb-6 md:mb-0">
              <img src="/logo.png" alt="logo" />
              <h1 className="mt-5 text-white">Manzilimiz</h1>
              <h1 className="mt-2 text-white">
                - Manzilimiz 190200, Angor tumani 8-Mart ko'chasi 2-uy . - Mo'ljal:
                Barkamol avlod bolalar maktabi
              </h1>

              <div className="mt-[45px] flex items-center gap-5">
                <FaTelegram className="text-white size-[34px]" />
                <FaFacebook className="text-white size-[34px]" />
                <FaSquareInstagram className="text-white size-[34px]" />
              </div>
            </div>

            <div className="w-full md:w-[270px] mb-6 md:mb-0">
              <h1 className="text-white text-[24px] mt-[20px] font-bold">
                Ma'lumotlar
              </h1>
              <div className="flex items-center gap-4 mt-[20px]">
                <FaMapMarkedAlt className="text-[#FBD45A] size-[30px]" />
                <h1 className="text-white text-[20px]">
                  Surxondaryo viloyati Angor tumani ...
                </h1>
              </div>

              <div className="flex items-center gap-4 mt-[20px]">
                <FaPhoneAlt className="text-[#FBD45A] size-[24px]" />
                <h1 className="text-white text-[20px]">+998 (94)-060-93 00</h1>
              </div>

              <div className="flex items-center gap-4 mt-[20px]">
                <FaRegClock className="text-[#FBD45A] size-[35px]" />
                <h1 className="text-white text-[20px]">
                  Du-Jum 9:00 - 18:00, Shan 9:00 - 17:00, Yakshanba yopiq
                </h1>
              </div>
            </div>

            <div className="w-full md:w-[270px]">
              <h1 className="text-white text-[24px] mt-[20px] font-bold">
                Murojat uchun
              </h1>

              <div className="flex gap-4 mt-[20px]">
                <FaPhoneAlt className="text-[#FBD45A] size-[24px]" />
                <div className="flex flex-col">
                  <h1 className="text-white text-[20px]">
                    +998 (91)-584-62 19
                  </h1>
                  <h1 className="text-white text-[20px] mt-4">
                    +998 (99)-507-36 84
                  </h1>
                </div>
              </div>

              <div className="flex gap-4 mt-[20px]">
                <MdEmail className="text-[#FBD45A] size-[24px]" />
                <div className="flex flex-col">
                  <h1 className="text-white text-[20px] break-all">
                    angorakmkutubxona@gmail.com
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
