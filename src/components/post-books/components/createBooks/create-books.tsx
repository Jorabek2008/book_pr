import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";

interface FormData {
  book_img: File | null;
  author_img: File | null;
  title_uz: string;
  text_uz: string;
  author: string;
  publisher: string;
}
export const CreateBooks = () => {
  const {
    handleSubmit,
    control,
    // reset,
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Controller
          name="title_uz"
          control={control}
          rules={{ required: "Kitobning nomini kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
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
              isInvalid={Boolean(errors.publisher?.message)}
              isRequired
              className="mt-6 mb-10"
              errorMessage={errors.publisher?.message as string}
            />
          )}
        />

        <input
          type="file"
          accept="image/*"
          {...register("book_img")}
          onChange={handleFileChange1}
        />

        <input
          type="file"
          accept="image/*"
          {...register("author_img")}
          onChange={handleFileChange2}
        />

        <Button
          color="primary"
          isLoading={loading}
          type="submit"
          className="mt-10 w-full"
        >
          Yuborish
        </Button>
      </form>
    </div>
  );
};
