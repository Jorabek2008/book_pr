import { Button, Input, Textarea } from "@nextui-org/react";

export const Contact = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto py-[25px]">
        <h1 className="text-[8vw] sm:text-[38px] text-[#030522] poppins-bold leading-[61px]">
          Aloqa
        </h1>

        <div className="flex flex-col md:flex-row justify-between bg-[#F6F1F1] mt-10">
          <div className="w-full md:w-[48%]">
            <img src="/map.png" alt="map" className="w-full" />
          </div>
          <div className="w-full md:w-[48%] pt-[50px] md:pt-[100px]">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Input label="Ism" className="w-full md:w-[48%] mb-3 md:mb-0" />
              <Input label="Email" className="w-full md:w-[48%]" />
            </div>
            <Input label="Mavzu" className="w-full mt-3" />
            <Textarea label="Xabar" className="w-full mt-3" />
            <Button className="bg-[#030522] text-white mt-3 w-full">
              Boshlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
