import { useState, useEffect } from "react";
import { About, Ads, Contact, Footer, Header } from "../../components";

const images = [
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://png.pngtree.com/background/20230403/original/pngtree-big-library-interior-books-shelf-vector-picture-image_2293285.jpg",
  "https://img.freepik.com/free-photo/anime-style-cozy-home-interior-with-furnishings_23-2151176467.jpg",
  "/libaryBg.png",
];

export const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />

      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-35 z-10"></div>
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
        </div>
        <div className="top-0 sm:left-[90px] left-[50%] translate-x-[-50%] sm:translate-x-0 absolute z-20 flex items-center justify-center flex-col h-full">
          <h1 className="xl:text-[59px] text-[25px] text-center sm:text-left sm:text-[4vw] md:text-[4vw] poppins-bold text-white xl:leading-[61px] sm:leading-[30px] md:leading-[40px]">
            <h1 className="xl:text-[35px] text-[16px] sm:text-[2vw] md:text-[2vw] poppins-regular text-white xl:leading-[61px] sm:leading-[20px] md:leading-[30px]">
              Bizning zamonaviy kutubxonamizga xush kelibsiz!
            </h1>
            Denov tuman Axborot <br /> kutubxona <br /> markazi
          </h1>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full ${
                currentImageIndex === index ? "bg-blue-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <About />

      <div className="bg-[#030522]">
        <div className="max-w-[1200px] mx-auto py-[25px]">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <h1 className="text-[10vw] sm:text-[68px] text-center text-white poppins-semibold leading-tight sm:leading-[76px]">
              454
              <span className="text-[5vw] sm:text-[35px] block poppins-regular leading-tight sm:leading-[38px]">
                Jami kitoblar soni
              </span>
            </h1>

            <h1 className="text-[10vw] sm:text-[68px] text-center text-white poppins-semibold leading-tight sm:leading-[76px]">
              7
              <span className="text-[5vw] sm:text-[35px] block poppins-regular leading-tight sm:leading-[38px]">
                Xalqaro adabiyotlar
              </span>
            </h1>

            <h1 className="text-[10vw] sm:text-[68px] text-center text-white poppins-semibold leading-tight sm:leading-[76px]">
              54
              <span className="text-[5vw] sm:text-[35px] block poppins-regular leading-tight sm:leading-[38px]">
                Milliy adabiyotlar
              </span>
            </h1>

            <h1 className="text-[10vw] sm:text-[68px] text-center text-white poppins-semibold leading-tight sm:leading-[76px]">
              454
              <span className="text-[5vw] sm:text-[35px] block poppins-regular leading-tight sm:leading-[38px]">
                Yoshlar uchun adabiyotlar
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-[60px]">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div
            className="w-full md:w-[388px] text-center rounded-[22px] p-[30px] mx-2"
            style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
          >
            <div className="w-[88px] h-[88px] bg-[#030522] mx-auto rounded-full flex items-center justify-center">
              <img
                src="/public/letter.png"
                alt="letter"
                className="w-[33px] h-[33px]"
              />
            </div>
            <h1 className="text-[6vw] md:text-[33px] mt-[20px] poppins-bold leading-[40px]">
              Mahalli ro'znoma
            </h1>
            <p className="text-[4vw] md:text-[22px] leading-[23px] poppins-semibold mt-[60px]">
              23 nafar toifali o'qituvchilar eng zamonaviy metodika orqali
              ta'lim berishadi
            </p>
            <button className="text-[5vw] md:text-[30px] poppins-bold mt-[41px] px-[40px] py-1 bg-[#030522] text-white rounded-xl">
              Batafsil
            </button>
          </div>

          <div
            className="w-full md:w-[388px] text-center rounded-[22px] p-[30px] mx-2"
            style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
          >
            <div className="w-[88px] h-[88px] bg-[#030522] mx-auto rounded-full flex items-center justify-center">
              <img
                src="/public/cub.png"
                alt="letter"
                className="w-[33px] h-[33px]"
              />
            </div>
            <h1 className="text-[6vw] md:text-[33px] mt-[20px] poppins-bold leading-[40px]">
              Buyurtma berish
            </h1>
            <p className="text-[4vw] md:text-[22px] leading-[23px] poppins-semibold mt-[60px]">
              14 nafar Ishlab chiqarish ta'lim ustalari talabalarga o'rgangan
              bilimlarini amaliyotda qo'llashlariga yordam beradi
            </p>
            <button className="text-[5vw] md:text-[30px] poppins-bold mt-[41px] px-[40px] py-1 bg-[#030522] text-white rounded-xl">
              Batafsil
            </button>
          </div>

          <div
            className="w-full md:w-[388px] text-center rounded-[22px] p-[30px] mx-2"
            style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
          >
            <div className="w-[88px] h-[88px] bg-[#030522] mx-auto rounded-full flex items-center justify-center">
              <img
                src="/public/image.png"
                alt="letter"
                className="w-[33px] h-[33px]"
              />
            </div>
            <h1 className="text-[6vw] md:text-[33px] mt-[20px] poppins-bold leading-[40px]">
              Xorijiy adabiyotlar kutubxonasi
            </h1>
            <p className="text-[4vw] md:text-[22px] leading-[23px] poppins-semibold mt-[60px]">
              Kurslar oxirida siz o'z sohangiz bo'yicha sizni ishga olib
              kiradigan diplom bilan ta'minlanasiz
            </p>
            <button className="text-[5vw] md:text-[30px] poppins-bold mt-[41px] px-[40px] py-1 bg-[#030522] text-white rounded-xl">
              Batafsil
            </button>
          </div>
        </div>
      </div>

      <Ads />

      <div className="bg-[#03052233]">
        <div className="max-w-[1200px] mx-auto py-[25px]">
          <h1 className="text-[8vw] sm:text-[38px] text-[#030522] poppins-bold leading-[61px]">
            O'qishga tavfsiya etamiz
          </h1>

          <div className="flex flex-col md:flex-row mt-10 flex-wrap items-center justify-between gap-3">
            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea1.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Denov tumani
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Maktab,Kollej,Oliy ta'lim fanlari uchun o'quv darsliklar
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea2.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Sarguzasht
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Milliy va jaxon sarguzashtga boy bo'lgan kitoblar
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea3.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Badiiy asarlar
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Eng sara badiiy asarlar jamlanmasi
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea4.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Denov tumani
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Maktab,Kollej,Oliy ta'lim fanlari uchun o'quv darsliklar
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea5.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Sarguzasht
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Milliy va jaxon sarguzashtga boy bo'lgan kitoblar
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[388px] rounded-2xl mx-2"
              style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
            >
              <div className="relative">
                <img
                  src="/public/idea6.png"
                  alt="tabiat 1 rasm"
                  className="w-full"
                />
              </div>

              <div className="pl-4 pb-6 text-center bg-white rounded-b-2xl">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] py-[16px]">
                  Badiiy asarlar
                </h1>
                <p className="text-[4vw] md:text-[17px] mb-20 text-[#030522] poppins-semibold leading-6">
                  Eng sara badiiy asarlar jamlanmasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contact />

      <Footer />
    </div>
  );
};
