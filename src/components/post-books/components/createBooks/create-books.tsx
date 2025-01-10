import { Button, Image, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface FormData {
  book_img: File[] | null;
  title_uz: string;
  text_uz: string;
  author: string;
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

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

    if (data.book_img) {
      selectedImages.forEach((file) => {
        formData.append("book_img", file);
      });
    }
    formData.append("title_uz", data.title_uz);
    formData.append("text_uz", data.text_uz);
    formData.append("author", data.author);

    try {
      await api.post("/books/create-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Kitob muvaffaqiyatli qo'shildi");
      reset({
        author: "",
        book_img: [],
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
    setSelectedImages(updatedImages);
    setValue("book_img", updatedImages);
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
              className="mt-6"
              errorMessage={errors.author?.message as string}
            />
          )}
        />

        <label htmlFor="img1" className="block mb-3">
          Kitobning rasmlarini kiriting
        </label>
        <input
          type="file"
          accept="image/*"
          id="img1"
          multiple
          {...register("book_img")}
          onChange={handleFileChange}
        />
        {selectedImages.map((img, index) => (
          <div key={index} className="flex items-center justify-between">
            <p>{img.name}</p>
            <Image
              src={URL.createObjectURL(img) || ""}
              alt="Selected"
              style={{ width: "100px", height: "100px" }}
            />

            <Button color="danger" onClick={() => handleRemoveImage(index)}>
              <FaTrash />
            </Button>
          </div>
        ))}

        <Button
          color="primary"
          isLoading={loading}
          type="submit"
          className="mt-10 w-full max-lg:mb-5"
        >
          Yuborish
        </Button>
      </form>
    </div>
  );
};
