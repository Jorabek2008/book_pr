import { useState, useEffect } from "react";
import { About, Ads, Contact, Footer, Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { getAdsThunk } from "../../redux/slice/get-ads-slice";
import { GetAllBooks } from "../../components/get-all-books";

const images = [
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
  "/libaryBg2.jpg",
  "/libaryBg3.jpg",
  "/libaryBg.png",
];

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getAdsThunk());
  }, []);

  const { ads } = useSelector((state: RootState) => state.getAds);
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
            Angor tuman Axborot <br /> kutubxona <br /> markazi
          </h1>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <div
              onClick={() => setCurrentImageIndex(index)}
              key={index}
              className={`w-3 h-3 cursor-pointer sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full ${
                currentImageIndex === index ? "bg-blue-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <About />

      <GetAllBooks pagination={false} />

      <Ads pagination={false} data={ads} />

      <Contact />

      <Footer />
    </div>
  );
};
