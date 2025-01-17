import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  title: string;
  id: string;
  file: File | null;
  link: string;
}
export const CreateBibliograph = () => {
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
    if (data.file && selectedImages) {
      formData.append("file", selectedImages);
    }
    formData.append("title", data.title);
    formData.append("link", data.link);
    try {
      await api.post("/bibliography/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post muvaffaqiyatli qo'shildi");
      reset({
        title: "",
        file: null,
        link: "",
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
      setValue("file", files[0]); // Update react-hook-form
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Bibliografiya nomini kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Bibliografiya nomi"}
              size="sm"
              isInvalid={Boolean(errors.title?.message)}
              isRequired
              errorMessage={errors.title?.message as string}
            />
          )}
        />
        <Controller
          name="link"
          control={control}
          rules={{ required: "Bibliografiya linkini yozing" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Bibliografiya link"}
              size="sm"
              isInvalid={Boolean(errors.link?.message)}
              isRequired
              className="mt-6"
              errorMessage={errors.link?.message as string}
            />
          )}
        />

        <label htmlFor="img1" className="block mt-3">
          Bibliografiya fileni kiriting
        </label>
        <input
          type="file"
          accept="application/pdf"
          id="img1"
          {...register("file")}
          onChange={handleFileChange}
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
