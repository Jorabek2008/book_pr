import { Pagination } from "@nextui-org/react";
import { AxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { api } from "../../api";

interface IAdsProps {
  id: number;
  title_uz: string;
  image: string;
  createdAt: string;
  view_count: number;
}

type AdsProps = {
  pagination: boolean; // pagination boolean tipida bo'ladi
  data: IAdsProps[]; // data massiv bo'ladi, massiv ichidagi ma'lumotni aniqlashtirish mumkin
};
export const Ads: FC<AdsProps> = ({ data, pagination }) => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [current, setCurrent] = useState<number>(1);

  const fetchAnswers = useCallback(async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/posts/get-all-posts", {
        params: { page, limit },
      });
      setTotalPages(Math.ceil(response.data.pagination.total / limit));
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    }
  }, []);
  // console.log(current);
  useEffect(() => {
    fetchAnswers(current);
  }, [fetchAnswers]);
  return (
    <div>
      <div className="max-w-[1200px] mx-auto py-[60px]">
        <h1 className="text-[8vw] sm:text-[38px] poppins-bold leading-[61px] mb-[21px]">
          E'lonlar
        </h1>
        <div className="flex flex-col md:flex-row items-center flex-wrap gap-3 justify-between">
          <div
            className="w-full md:w-[388px] rounded-2xl mx-2"
            style={{ boxShadow: "1px 1px 6.8px 0px #00000040" }}
          >
            <div className="relative">
              <img src="/ads1.png" alt="tabiat 1 rasm" className="w-full" />
            </div>

            {data?.map((item) => (
              <div key={item.id} className="ml-4 mb-6">
                <h1 className="text-[6vw] md:text-[22px] poppins-bold leading-[32px] text-[#030522] my-[16px]">
                  {item.title_uz}
                </h1>

                <div className="flex items-center gap-[35px] mt-[27px]">
                  <div className="flex items-center gap-2 text-[#0000009E] poppins-medium">
                    <FaRegEye size={17} />
                    {item.view_count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {pagination ? (
          <div className="flex justify-center mt-[50px]">
            <Pagination
              isCompact
              showControls
              initialPage={1}
              size="lg"
              className="mx-auto"
              total={totalPages}
              onChange={(page) => setCurrent(page)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
