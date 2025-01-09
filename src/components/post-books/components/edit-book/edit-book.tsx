import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Image, Input } from "@nextui-org/react";
import { FaPlus, FaTrash } from "react-icons/fa";

type TGetId = {
  id: string;
};

interface FormData {
  book_img: File[] | string[];
  author_img: File | null;
  title_uz: string;
  text_uz: string;
  author: string;
  publisher: string;
}

export const EditBook: FC<TGetId> = ({ id }) => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    if (data.author_img) {
      formData.append("author_img", data.author_img);
    }
    if (data.book_img) {
      selectedImages.forEach((file) => {
        formData.append("book_img", file);
      });
    }
    formData.append("title_uz", data.title_uz);
    formData.append("text_uz", data.text_uz);
    formData.append("author", data.author);
    formData.append("publisher", data.publisher);

    try {
      await api.put(`/books/update-book/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Kitob muvaffaqiyatli qo'shildi");
      reset({
        author: "",
        book_img: [],
        publisher: "",
        text_uz: "",
        title_uz: "",
      });
      setSelectedImages([]);
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

  const editBooks = async (id: string) => {
    try {
      const response = await api.get(`/books/get-book/${id}`);

      setSelectedImages(response.data.data.book_img);
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

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files); // Convert FileList to Array
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]); // Append new files
      setValue("book_img", [...selectedImages, ...fileArray]); // Faqat birinchi faylni saqlash
    }
  };

  const getImageSrc = (item: string | File): string => {
    if (typeof item === "string") {
      return item; // URL formatidagi rasm
    }
    return URL.createObjectURL(item); // File obyektini blob URL formatiga o'zgartirish
  };
  const handleRemoveImage = (index: number) => {
    const newImages = selectedImages.filter(
      (_, imgIndex) => imgIndex !== index,
    ); // Tanlangan indexni o‘chirib tashlash
    setSelectedImages(newImages); // Yangilangan massivni holatda saqlash
    setValue("book_img", newImages); // Faqat birinchi faylni saqlash
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

          <input
            id="img1"
            type="file"
            accept="image/*"
            {...register("book_img")}
            className="hidden"
            onChange={handleFileChange1}
          />
          {selectedImages?.map((item, index) => (
            <div className="flex items-center gap-8 my-2">
              <Image
                key={index}
                src={`${getImageSrc(item)}`}
                className="w-[200px] h-[150px] object-cover"
              />
              <Button color="danger" onClick={() => handleRemoveImage(index)}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <label htmlFor="img1" className=" cursor-pointer flex justify-center">
            <FaPlus size={60} className="border-2 border-black rounded-md" />
          </label>

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
