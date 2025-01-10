import { Button, Image, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  id: string;
  title_uz: string;
  image: File | null;
  view_count: string;
  text_uz: string;
}
export const CreatePosts = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<File | null>(null);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    if (data.image && selectedImages) {
      formData.append("image", selectedImages);
    }
    formData.append("title_uz", data.title_uz);
    formData.append("text_uz", data.text_uz);
    try {
      await api.post("/posts/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post muvaffaqiyatli qo'shildi");
      reset({
        image: null,
        text_uz: "",
        title_uz: "",
      });
      setSelectedImages(null);
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
      // Convert FileList to Array
      setSelectedImages(files[0]); // Append new files
      setValue("image", files[0]); // Update react-hook-form
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Controller
          name="title_uz"
          control={control}
          rules={{ required: "Postning nomini kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Post nomi"}
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
          rules={{ required: "Post haqida yozing" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Post haqida"}
              size="sm"
              isInvalid={Boolean(errors.text_uz?.message)}
              isRequired
              className="mt-6"
              errorMessage={errors.text_uz?.message as string}
            />
          )}
        />

        <label htmlFor="img1" className="block mt-3">
          Postning rasmini kiriting
        </label>
        <input
          type="file"
          accept="image/*"
          id="img1"
          {...register("image")}
          onChange={handleFileChange}
        />

        <div className="flex items-center justify-between">
          {selectedImages && (
            <Image
              src={`${URL.createObjectURL(selectedImages)}`}
              alt="Selected"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

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
