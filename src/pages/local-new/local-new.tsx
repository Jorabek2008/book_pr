import { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import { api } from "../../api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Image, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface IBibliog {
  id: number | null;
  file: string | null;
  link: string | null;
  title: string;
  updateAt: string;
}
export const LocalNew = () => {
  const [bibliograp, setBibliograph] = useState<IBibliog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBibliograph = async () => {
    setLoading(false);
    try {
      const response = await api.get("/bibliography/all");
      setBibliograph(response.data.data);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    getBibliograph();
  }, []);

  return (
    <div className="w-full">
      <Header />
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        <div className="bg-[#03052233] w-full lg:w-[1017px] pl-4 lg:pl-[182px] pt-[54px]">
          {loading ? (
            <div className="mr-5">
              <h1 className="text-[20px] font-semibold">
                Bibliografik qo'llanmalar:
              </h1>
              {bibliograp.map((item) => (
                <div key={item.id} className="border-1 p-2">
                  {item.link ? (
                    <h1 className="text-primary">
                      <Link
                        to={`${item.link}`}
                        className="text-primary underline text-[18px] hover:text-black hover:no-underline transition-colors ease-in"
                      >
                        {item.title}
                      </Link>
                    </h1>
                  ) : (
                    <Link
                      to={`${item.file}`}
                      target="_blank"
                      className="text-primary underline text-[18px] hover:text-black hover:no-underline transition-colors ease-linear"
                    >
                      <h1>{item.title}</h1>
                    </Link>
                  )}

                  {/* <h1>{item.updateAt}</h1> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <Spinner />
            </div>
          )}
        </div>
        <div className="w-full lg:w-[330px] text-center mt-6 lg:mt-0">
          <div className="mt-6">
            <Image src="/generateAi.png" className=" p-2" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
