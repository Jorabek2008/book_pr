import { FaRegClock, FaUser } from "react-icons/fa";
import { Footer, Header } from "../../components";
import { Image } from "@nextui-org/react";

export const LocalNew = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full flex flex-col lg:flex-row">
        <div className="bg-[#03052233] w-full lg:w-[1017px] pl-4 lg:pl-[182px] pt-[54px]">
          <h1 className="text-[#00000099] flex items-center gap-3 text-sm lg:text-base leading-tight lg:leading-normal">
            O'zbekiston | 19:53 / 12.12.2024 <FaUser /> 43854 <FaRegClock /> 10
            daqiqa o'qiladi
          </h1>
          <div className="flex flex-col lg:flex-row mt-4 pb-[110px] gap-[24px]">
            <div>
              <h1 className="text-[#030522] text-[5vw] lg:text-[20px] leading-tight lg:leading-[28px] w-full lg:w-[363px] font-medium">
                Denov tumani haqida yangi mavzu.”Yangi hayot uchun”
              </h1>
              <p className="mt-[15px] text-[#030522CC] text-[4vw] lg:text-[16px] leading-tight lg:leading-[24px] w-full lg:w-[412px]">
                Qish kelishi bilan metan-shoxobchalar ish vaqti yana cheklandi,
                navbatlar kilometrlarga cho'zilmoqda. Shunday sharoitda, Kun.uz
                savollariga javob bergan energetika vazirining matbuot kotibi
                Hasan Toshxo'jayev haydovchilarga gaz bo'lmasa, benzin quyish
                yoki elektromobil sotib olishni maslahat berdi. Mavjud vaziyat
                uchun mas'uliyatni esa ob-havoga yukladi: “Dekabr oyida
                bunaqangi sovuq bo'lmas edi, bu yil bizga o'ziga xos iqlim kirib
                keldi”.
              </p>
            </div>
            <Image
              src="/darakchi.png"
              alt="local-new"
              className="!rounded-none w-full lg:w-auto"
            />
          </div>
        </div>
        <div className="w-full lg:w-[330px] text-center mt-6 lg:mt-0">
          <div className="mt-6">
            <h1 className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[24px] font-bold">
              Tavsiya etamiz
            </h1>
            <p
              className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[22px] before:inline-block before:w-2 before:h-2 before:mr-4
           before:bg-black before:rounded-full mt-3"
            >
              Isroil egallab olgan Jo'lan tepaliklari qanday strategik
              ahamiyatga ega?
            </p>

            <p className="text-[4vw] lg:text-[14px] text-[#28282ecc] leading-tight lg:leading-[22px] text-right">
              Jahon | 22:15 / 12.12.2024
            </p>
          </div>

          <div className="mt-6">
            <h1 className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[24px] font-bold">
              Tavsiya etamiz
            </h1>
            <p
              className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[22px] before:inline-block before:w-2 before:h-2 before:mr-4
           before:bg-black before:rounded-full mt-3 pt-3"
            >
              Isroil egallab olgan Jo'lan tepaliklari qanday strategik
              ahamiyatga ega?
            </p>

            <p className="text-[4vw] lg:text-[14px] text-[#28282ecc] leading-tight lg:leading-[22px] text-right">
              Jahon | 22:15 / 12.12.2024
            </p>

            <p
              className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[22px] before:inline-block before:w-2 before:h-2 before:mr-4
           before:bg-black before:rounded-full mt-3"
            >
              Isroil egallab olgan Jo'lan tepaliklari qanday strategik
              ahamiyatga ega?
            </p>

            <p className="text-[4vw] lg:text-[14px] text-[#28282ecc] leading-tight lg:leading-[22px] text-right">
              Jahon | 22:15 / 12.12.2024
            </p>

            <p
              className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[22px] before:inline-block before:w-2 before:h-2 before:mr-4
           before:bg-black before:rounded-full mt-3"
            >
              Isroil egallab olgan Jo'lan tepaliklari qanday strategik
              ahamiyatga ega?
            </p>

            <p className="text-[4vw] lg:text-[14px] text-[#28282ecc] leading-tight lg:leading-[22px] text-right">
              Jahon | 22:15 / 12.12.2024
            </p>
          </div>

          <div className="mt-6">
            <h1 className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[24px] font-bold">
              Tavsiya etamiz
            </h1>
            <p
              className="text-[5vw] lg:text-[16px] leading-tight lg:leading-[22px] before:inline-block before:w-2 before:h-2 before:mr-4
           before:bg-black before:rounded-full mt-3"
            >
              Isroil egallab olgan Jo'lan tepaliklari qanday strategik
              ahamiyatga ega?
            </p>

            <p className="text-[4vw] lg:text-[14px] text-[#28282ecc] leading-tight lg:leading-[22px] text-right">
              Jahon | 22:15 / 12.12.2024
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
