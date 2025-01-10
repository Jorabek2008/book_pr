import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../../api";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Image, Input } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

interface FormData {
  id: string;
  full_name: string;
  avatar: File | null;
  position: string;
  birthday: string;
  about: string;
}

type TForm = {
  id: FormData;
};
export const EditStaff: FC<TForm> = ({ id }) => {
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
    formData.append("about", data.about);
    formData.append("birthday", data.birthday.slice(0, 10));
    formData.append("full_name", data.full_name);
    formData.append("position", data.position);

    try {
      await api.put(`/posts/edit-post/${id.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post muvaffaqiyatli o'zgartirildi");
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

  const editBooks = async () => {
    setSelectedImages(id.avatar);
    setValue("about", id.about);
    setValue("birthday", id.birthday);
    setValue("full_name", id.full_name);
    setValue("position", id.position);
  };

  useEffect(() => {
    editBooks();
  }, [id]);

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to Array
      setSelectedImages(files[0]); // Append new files
      setValue("avatar", files[0]); // Update react-hook-form
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
    setValue("avatar", null); // Faqat birinchi faylni saqlash
  };
  return (
    <div>
      <div>
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
                label={"Xodim tug'ilganini kiriting"}
                size="sm"
                value={field?.value?.slice(0, 10)}
                onChange={(e) => field.onChange(e.target.value)}
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
            onChange={handleFileChange1}
          />

          <div className="flex items-center justify-between mt-4">
            {selectedImages && (
              <>
                <div className="flex gap-3 items-center">
                  <Image
                    src={`${getImageSrc(selectedImages)}`}
                    alt="Selected"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Button onPress={() => handleRemoveImage()} color="danger">
                    <FaTrash />
                  </Button>
                </div>
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
