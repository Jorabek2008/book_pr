import { Image } from "@nextui-org/react";

export const About = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto pt-[54px] pb-[75px]">
        <h1 className="text-[8vw] sm:text-[38px] poppins-bold leading-[61px]">
          Biz haqimizda
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          <div className="flex-1">
            <h3 className="text-[6vw] sm:text-[28px] mt-3 poppins-bold leading-[32px]">
              Denov tumanidagi ushbu kutubxonada barcha turdagi kitoblarni
              topishingiz mumkin.
            </h3>

            <h4 className="text-[5vw] sm:text-[26px] mt-[19px] poppins-medium leading-[30px]">
              Kitoblar turlari
            </h4>

            <div className="mt-[32px] ml-[20px]">
              <div className="flex gap-3">
                <img
                  src="/public/check.png"
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[4vw] sm:text-[19px] poppins-regular">
                  Xalqaro
                </p>
              </div>
              <div className="flex gap-3">
                <img
                  src="/public/check.png"
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[4vw] sm:text-[19px] poppins-regular">
                  O'quv darliklar
                </p>
              </div>
              <div className="flex gap-3">
                <img
                  src="/public/check.png"
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[4vw] sm:text-[19px] poppins-regular">
                  Barcha turdagi badiiy asarlar
                </p>
              </div>
            </div>

            <p className="text-[4vw] sm:text-[19px] poppins-regular mt-[31px]">
              Bundan tashqari yoshlar va katta yoshlilar uchun ham kitoblarimiz
              mavjud.
            </p>
          </div>

          <Image
            src="/public/weAbout.png"
            className="w-full sm:w-[557px] h-auto mt-4 sm:mt-0"
            alt="libaryBg"
          />
        </div>
      </div>
    </div>
  );
};
