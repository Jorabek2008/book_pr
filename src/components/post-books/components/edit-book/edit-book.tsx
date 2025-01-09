import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Image, Input } from "@nextui-org/react";

type TGetId = {
  id: string;
};

interface FormData {
  book_img: File | null;
  author_img: File | null;
  title_uz: string;
  text_uz: string;
  author: string;
  publisher: string;
}

interface FormDataObj {
  book_img: File[] | null;
  author_img: File[] | null;
  title_uz: string;
  text_uz: string;
  author: string;
  publisher: string;
}
export const EditBook: FC<TGetId> = ({ id }) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    if (data.author_img) {
      formData.append("author_img", data.author_img);
    }
    if (data.book_img) {
      formData.append("book_img", data.book_img);
    }
    formData.append("title_uz", data.title_uz);
    formData.append("text_uz", data.text_uz);
    formData.append("author", data.author);
    formData.append("publisher", data.publisher);

    try {
      const response = await api.post("/books/create-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const [editBooksData, setEditBooksData] = useState<FormDataObj>();
  const editBooks = async (id: string) => {
    try {
      const response = await api.get(`/books/get-book/${id}`);

      setEditBooksData(response.data.data);
      setValue("author", response.data.data.author);
      setValue("author_img", response.data.data.author_img);
      setValue("book_img", response.data.data.book_img);
      setValue("publisher", response.data.data.publisher);
      setValue("text_uz", response.data.data.text_uz);
      setValue("title_uz", response.data.data.title_uz);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    }
  };

  useEffect(() => {
    editBooks(id);
  }, [id]);

  console.log(editBooksData);

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("book_img", files[0]);
    } else {
      setValue("book_img", null);
    }
  };
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("author_img", files[0]);
    } else {
      setValue("author_img", null);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <Controller
            name="title_uz"
            control={control}
            rules={{ required: "Kitobning nomini kiriting" }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value}
                label={"Kitobning nomi"}
                size="sm"
                isInvalid={Boolean(errors.title_uz?.message)}
                isRequired
                errorMessage={errors.title_uz?.message as string}
              />
            )}
          />
          <Controller
            name="text_uz"
            control={control}
            rules={{ required: "Kitob haqida yozing" }}
            render={({ field }) => (
              <Input
                {...field}
                label={"Kitob haqida"}
                size="sm"
                isInvalid={Boolean(errors.text_uz?.message)}
                isRequired
                value={field.value}
                className="mt-6"
                errorMessage={errors.text_uz?.message as string}
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            rules={{ required: "Kitob muallifini yozing" }}
            render={({ field }) => (
              <Input
                {...field}
                label={"Kitob muallifi"}
                size="sm"
                value={field.value}
                isInvalid={Boolean(errors.author?.message)}
                isRequired
                className="mt-6"
                errorMessage={errors.author?.message as string}
              />
            )}
          />
          <Controller
            name="publisher"
            control={control}
            rules={{ required: "Nashriyotchini kiriting" }}
            render={({ field }) => (
              <Input
                {...field}
                label={"Nashriyotchi"}
                size="sm"
                value={field.value}
                isInvalid={Boolean(errors.publisher?.message)}
                isRequired
                className="mt-6 mb-10"
                errorMessage={errors.publisher?.message as string}
              />
            )}
          />

          <label htmlFor="img1" className="flex flex-col gap-4">
            <input
              id="img1"
              type="file"
              accept="image/*"
              className={`${editBooksData?.book_img && "hidden"}`}
              {...register("book_img")}
              onChange={handleFileChange1}
            />
            {editBooksData?.book_img?.map((item, index) => (
              <Image
                key={index}
                src={`${item}`}
                id={`img-${index}`}
                className="w-[200px] h-[150px] object-cover cursor-pointer"
              />
            ))}
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("author_img")}
            onChange={handleFileChange2}
          />
          {/* {editBooksData?.author_img?.map(item => (
            
            <Image
              src={`${item}`}
              className="w-[200px] h-[150px] object-cover"
            />
          ))} */}

          <Button
            color="primary"
            isLoading={loading}
            type="submit"
            className="mt-10 w-full"
          >
            Tahrirlash
          </Button>
        </form>
      </div>
    </div>
  );
};
