import { Image } from "@nextui-org/react";

export const About = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto pt-[54px] pb-[75px] max-lg:p-10">
        <h1 className="text-[8vw] sm:text-[38px] poppins-bold leading-[61px]">
          Biz haqimizda
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          <div className="flex-1">
            <h3 className="text-[6vw] sm:text-[28px] mt-3 poppins-bold leading-[32px]">
              Angor tumanidagi ushbu kutubxonada barcha turdagi kitoblarni
              topishingiz mumkin.
            </h3>

            <div className="mt-[32px] ml-[20px]">
              <div className="flex gap-3">
                <img
                  src="/check.png"
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[4vw] sm:text-[19px] poppins-regular">
                  Barcha turdagi adabiyotlar
                </p>
              </div>

              <div className="flex gap-3">
                <img
                  src="/check.png"
                  alt="check"
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[4vw] sm:text-[19px] poppins-regular">
                  Barcha turdagi badiiy asarlar
                </p>
              </div>
            </div>

            <p className="text-[4vw] sm:text-[19px] poppins-regular mt-[31px]">
              Siz izlagan barcha adabiyotlar angor tuman axbarot kutubxonasida
            </p>
          </div>

          <Image
            src="/about.jpg"
            className="w-full sm:w-[557px] h-auto mt-4 sm:mt-0"
            alt="libaryBg"
          />
        </div>
      </div>
    </div>
  );
};
