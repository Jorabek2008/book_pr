import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Image, Input } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

type TGetId = {
  id: string;
};

interface FormData {
  image: File | null;
  title_uz: string;
  text_uz: string;
}

export const EditPosts: FC<TGetId> = ({ id }) => {
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
      await api.put(`/posts/edit-post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post muvaffaqiyatli o'zgartirildi");
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

  const editBooks = async (id: string) => {
    try {
      const response = await api.get(`/posts/get-post/${id}`);

      setSelectedImages(response.data.data.image);
      setValue("image", response.data.data.image);
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
      // Convert FileList to Array
      setSelectedImages(files[0]); // Append new files
      setValue("image", files[0]); // Update react-hook-form
    }
  };

  const getImageSrc = (item: string | File): string => {
    if (typeof item === "string") {
      return item; // URL formatidagi rasm
    }
    return URL.createObjectURL(item); // File obyektini blob URL formatiga o'zgartirish
  };
  const handleRemoveImage = () => {
    setSelectedImages(null); // Yangilangan massivni holatda saqlash
    setValue("image", null); // Faqat birinchi faylni saqlash
  };
  return (
    <div>
      <div>
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
            onChange={handleFileChange1}
          />

          <div className="flex items-center gap-3 mt-4">
            {selectedImages && (
              <>
                <Image
                  src={`${getImageSrc(selectedImages)}`}
                  className="w-[200px] h-[150px] object-cover"
                />
                <Button color="danger" onPress={() => handleRemoveImage()}>
                  <FaTrash />
                </Button>
              </>
            )}
          </div>

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
