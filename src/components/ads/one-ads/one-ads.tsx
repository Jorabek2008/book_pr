import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../header";
import { Footer } from "../../footer";
import { api } from "../../../api";
import { Image, Spinner } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";

interface IGetBook {
  id: string;
  title_uz: string;
  text_uz: string;
  image: string;
  view_count: string;
  createdAt: string;
}

export const OneAds = () => {
  const { adsId } = useParams();
  const [getBook, setGetBook] = useState<IGetBook>();
  const [loading, setLoading] = useState(false);
  const getOnebook = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/posts/get-post/${adsId}`);
      setGetBook(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOnebook();
  }, [adsId]);
  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto pt-[54px] pb-[75px] max-lg:p-10">
        <div className="mx-auto p-6">
          {loading && <Spinner className="flex justify-center mt-20" />}

          {getBook && (
            <div className="flex flex-col md:flex-row justify-around">
              <div className="mb-4 md:mb-0">
                <Image
                  src={getBook.image}
                  alt="book img"
                  className="w-full md:w-[400px] md:h-[350px] object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 hyphens-auto">
                  Postning nomi: {getBook.title_uz}
                </h1>

                <h1 className="text-2xl text-gray-800 mb-2 hyphens-auto">
                  Postning yaratilgan sanasi: {getBook.createdAt.slice(0, 10)}
                </h1>

                <h1 className="text-lg text-gray-800 mb-2 hyphens-auto">
                  Post haqida: {getBook.text_uz}
                </h1>
                <h1 className="text-lg text-gray-800 flex gap-3 items-center mb-2 hyphens-auto">
                  Postni ko'rganlar soni: <FaEye /> {getBook.view_count}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
