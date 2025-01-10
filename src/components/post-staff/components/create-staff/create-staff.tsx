import { Button, Image, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  id: string;
  full_name: string;
  avatar: File | null;
  position: string;
  birthday: string;
  about: string;
}
export const CreateStaff = () => {
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
    if (data.avatar && selectedImages) {
      formData.append("avatar", selectedImages);
    }
    formData.append("full_name", data.full_name);
    formData.append("birtday", data.birthday);
    formData.append("about", data.about);
    formData.append("position", data.position);
    try {
      await api.post("/books/create-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post muvaffaqiyatli qo'shildi");
      reset({
        avatar: null,
        about: "",
        birthday: "",
        full_name: "",
        position: "",
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
      setValue("avatar", files[0]); // Update react-hook-form
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Controller
          name="full_name"
          control={control}
          rules={{ required: "Xodimning to'liq ismini kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Xodimning to'liq ismi"}
              size="sm"
              isInvalid={Boolean(errors.full_name?.message)}
              errorMessage={errors.full_name?.message as string}
            />
          )}
        />
        <Controller
          name="about"
          control={control}
          rules={{ required: "Xodim haqida yozing" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Xodim haqida"}
              size="sm"
              isInvalid={Boolean(errors.about?.message)}
              className="mt-6"
              errorMessage={errors.about?.message as string}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          rules={{ required: "Xodim ish turini yozing" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Xodim turini kiriting"}
              size="sm"
              isInvalid={Boolean(errors.about?.message)}
              className="mt-6"
              errorMessage={errors.about?.message as string}
            />
          )}
        />
        <Controller
          name="birthday"
          control={control}
          rules={{ required: "Xodim tug'ilgan kunini yozing" }}
          render={({ field }) => (
            <Input
              {...field}
              label={"Xodim tug'ilganini kiriting"}
              size="sm"
              isInvalid={Boolean(errors.birthday?.message)}
              className="mt-6"
              errorMessage={errors.birthday?.message as string}
            />
          )}
        />

        <label htmlFor="img1" className="block mt-3">
          Xodimning rasmini kiriting
        </label>
        <input
          type="file"
          accept="image/*"
          id="img1"
          {...register("avatar")}
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
