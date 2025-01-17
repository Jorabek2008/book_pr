import { Card, Image, Pagination, Skeleton } from "@nextui-org/react";
import { AxiosError } from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendar, FaRegEye } from "react-icons/fa";
import { api } from "../../api";

interface IAdsProps {
  id: number;
  title_uz: string;
  image: string;
  createdAt: string;
  view_count: number;
}

type AdsProps = {
  pagination: boolean;
  data: IAdsProps[];
};
export const Ads: FC<AdsProps> = ({ data, pagination }) => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<IAdsProps[]>([]);

  const fetchAnswers = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await api.get("/posts/get-all-posts", {
        params: { page, limit },
      });
      setAllPosts(response.data.data);

      setTotalPages(Math.ceil(response.data.pagination.total / limit));
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAnswers(current);
    setAllPosts(data);
  }, [current, data]);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto py-[60px] max-lg:p-10">
        <h1 className="text-[8vw] sm:text-[38px] poppins-bold leading-[61px] mb-[21px]">
          E'lonlar
        </h1>
        <div className="flex flex-col md:flex-row items-center flex-wrap gap-3 justify-between">
          <div className="w-full rounded-2xl mx-2 grid grid-cols-4 gap-5 gap-x-20">
            {loading ? (
              <div>
                <Card className="w-[300px] p-4" radius="lg">
                  <Skeleton className="rounded-lg h-[200px]">
                    <div className="h-24 rounded-lg bg-default-300" />
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="mt-3 h-[40px] rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                  </div>
                </Card>
              </div>
            ) : (
              allPosts?.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => location.replace(`/one-ads/${item.id}`)}
                >
                  <Card className="w-[200px] sm:w-[230px] md:w-[300px]">
                    <div className="relative">
                      <Image
                        src={`${item.image}`}
                        className="w-[300px] h-[230px] object-cover rounded-t-xl rounded-b-none"
                      />
                    </div>
                    <div className="ml-4 mb-6">
                      <h1 className="text-[6vw] hyphens-auto md:text-[22px] poppins-bold leading-[32px] text-[#030522] my-[16px]">
                        {item.title_uz}
                      </h1>

                      <div className="flex items-center gap-[35px] mt-[27px]">
                        <div className="flex items-center hyphens-auto gap-2 text-[#0000009E] poppins-medium">
                          <FaRegEye size={17} />
                          {item.view_count}
                        </div>
                        <div className="flex items-center hyphens-auto gap-2 text-[#0000009E] poppins-medium">
                          <FaCalendar size={17} />
                          {item.createdAt.slice(0, 10)}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            )}
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
