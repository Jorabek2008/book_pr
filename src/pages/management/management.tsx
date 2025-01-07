import { Card, Image, Skeleton } from "@nextui-org/react";
import { Footer, Header } from "../../components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../api";
import { AxiosError } from "axios";

interface IGetStaff {
  about: string;
  avatar: string;
  birthday: string;
  full_name: string;
  position: string;
  id: string;
}
export const Management = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [getStaf, setGetStaf] = useState<IGetStaff[]>([]);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/staff");
      setGetStaf(response.data.data);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  console.log(getStaf);
  useEffect(() => {
    fetchAnswers();
  }, []);
  return (
    <div>
      <Header />
      <div className="max-w-[1220px] p-[28px] mx-auto">
        <h1 className="text-[25px] font-bold tracking-[1px]">Xodimlar</h1>
        {loading ? (
          <Card>
            <Skeleton className="w-full h-[300px]"></Skeleton>
          </Card>
        ) : (
          getStaf.map((item) => (
            <div
              key={item.id}
              className="my-8 border-[1px] border-solid border-gray-400 pb-10 sm:pb-20"
            >
              <div className="flex flex-col sm:flex-row gap-7 p-1 md:p-10">
                <Image
                  src={`${item.avatar}`}
                  className="rounded-md object-cover w-full sm:w-[250px] sm:h-[300px] max-h-auto max-w-auto"
                />

                <div className="sm:ml-8">
                  <h2 className="font-bold text-[22px] sm:text-[25px] mb-5">
                    {item.full_name}
                  </h2>
                  <span className="text-[18px] sm:text-[20px]">
                    {item.position}
                  </span>
                  <p className="text-[18px] sm:text-[20px] mt-5">
                    {new Date(item.birthday).getDate()}.
                    {new Date(item.birthday).getMonth() + 1}.
                    {new Date(item.birthday).getFullYear()}
                  </p>
                  <div className="mt-4">
                    <p>{item.about}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};
