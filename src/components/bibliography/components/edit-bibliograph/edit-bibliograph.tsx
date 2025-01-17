import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";

interface FormData {
  title: string;
  id: string;
  file: File | null;
  link: string;
}

type TForm = {
  id: FormData;
};
export const EditBibliograph: FC<TForm> = ({ id }) => {
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
    console.log(data);
    setLoading(true);
    const formData = new FormData();
    if (data.file) {
      formData.append("file", data.file);
    }
    if (selectedImages) {
      formData.append("file", selectedImages);
    }
    formData.append("title", data.title);
    formData.append("link", data.link);
    try {
      await api.put(`/bibliography/${data.id}`, formData, {
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
        console.error("Axios Error:", error.message);
      } else {
        toast.error("Error" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const editBooks = async () => {
    setValue("title", id.title);
    setValue("link", id.link);
    setValue("id", id.id);
  };

  useEffect(() => {
    editBooks();
  }, [id]);

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImages(files[0]); // Append new files
      setValue("file", files[0]); // Update react-hook-form
    }
  };

  return (
    <div>
      <div>
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
            onChange={handleFileChange1}
          />
          {selectedImages ? (
            <h1>{selectedImages?.name}</h1>
          ) : (
            <h1>{`${id.file}`}</h1>
          )}
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
