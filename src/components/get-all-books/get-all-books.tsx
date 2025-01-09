import { FC, useCallback, useEffect, useState } from "react";
import { api } from "../../api";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Skeleton,
} from "@nextui-org/react";

interface IGetAllBooks {
  author: string;
  author_img: string;
  book_img: string[];
  id: string;
  text_uz: string;
  title_uz: string;
}
type AdsProps = {
  pagination: boolean;
};

export const GetAllBooks: FC<AdsProps> = ({ pagination }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allBooks, setAllBooks] = useState<IGetAllBooks[]>([]);

  const [current, setCurrent] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const getAllBooks = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await api.get("/books/get-all-books", {
        params: { page, limit },
      });
      setAllBooks(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total / limit));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllBooks(current);
  }, [current]);
  return (
    <div className="max-w-[1200px] mx-auto pt-[54px] pb-[75px]">
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
        <>
          <div className="grid grid-cols-4 gap-10">
            {allBooks.map((item) => (
              <Card key={item.id} className="w-[300px]">
                <CardBody>
                  {item.book_img.slice(0, 1).map((item1) => (
                    <Image src={`${item1}`} className="object-cover w-full h-[230px]" />
                  ))}
                </CardBody>
                <div className="p-[12px]">
                  <h1 className="text-[6vw] md:text-[22px] font-semibold text-left">
                    {item.title_uz}
                  </h1>
                  <h1>{item.text_uz}</h1>
                </div>
                <CardFooter className="flex items-center gap-3">
                  <Image
                    src={`${item.author_img}`}
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                  <h1 className="text-[6vw] md:text-[22px]">{item.author}</h1>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
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
  );
};
