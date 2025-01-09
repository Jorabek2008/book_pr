import { Button, Image, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface FormData {
  book_img: File[] | null;
  author_img: File[] | null;
  title_uz: string;
  text_uz: string;
  author: string;
  publisher: string;
}
export const CreateBooks = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [authorImg, setAuthorImg] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    if (data.author_img) {
      authorImg.forEach((file) => {
        formData.append("author_img", file);
      });
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
      await api.post("/books/create-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Kitob muvaffaqiyatli qo'shildi");
      reset({
        author: "",
        author_img: [],
        book_img: [],
        publisher: "",
        text_uz: "",
        title_uz: "",
      });
      setSelectedImages([]);
      setAuthorImg([]);
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

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files); // Convert FileList to Array
      setAuthorImg((prevImages) => [...prevImages, ...fileArray]); // Append new files
      setValue("author_img", [...selectedImages, ...fileArray]); // Faqat birinchi faylni saqlash
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to Array
      setSelectedImages((prevImages) => [...prevImages, ...fileArray]); // Append new files
      setValue("book_img", [...selectedImages, ...fileArray]); // Update react-hook-form
    }
  };
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages); // Mahalliy holatni yangilash
    setValue("book_img", updatedImages); // React Hook Form qiymatini yangilash
  };

  return (
    <div>
      <Toaster />
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

        <label htmlFor="img1" className="block">
          Kitobning rasmlarini kiriting
        </label>
        <input
          type="file"
          accept="image/*"
          id="img1"
          multiple // Allow multiple file selection
          {...register("book_img")}
          onChange={handleFileChange}
        />
        {selectedImages.map((img, index) => (
          <div key={index} className="flex items-center justify-between">
            <p>{img.name}</p>
            <Image
              src={`${URL.createObjectURL(img)}`}
              alt="Selected"
              style={{ width: "100px", height: "100px" }}
            />

            <Button color="danger" onClick={() => handleRemoveImage(index)}>
              <FaTrash />
            </Button>
          </div>
        ))}

        <input
          type="file"
          accept="image/*"
          {...register("author_img")}
          onChange={handleFileChange2}
        />
        {authorImg.map((item) => (
          <Image
            src={`${URL.createObjectURL(item)}`}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
            className="object-cover"
          />
        ))}

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
