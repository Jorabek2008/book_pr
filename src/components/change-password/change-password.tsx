import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useState, FC } from "react";
import { api } from "../../api";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePassword: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("oldPassword", data.oldPassword);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmPassword", data.confirmPassword);
    try {
      await api.put(`/auth/change-password`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Parol muvaffaqiyatli yangilandi!");
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
        reset({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Error" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-[8vw] md:text-[40px] font-bold">
        Parolni o'zgartirish
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0">
        <div className="flex flex-col justify-center mt-4">
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: "Eski Parolingizni kiriting!" }}
            render={({ field }) => (
              <Input
                {...field}
                label={"Old Password"}
                type="password"
                size="sm"
                isInvalid={Boolean(errors.oldPassword?.message)}
                className="m-2 w-full md:max-w-full"
                errorMessage={errors.oldPassword?.message as string}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: "Yangi Parolingizni kiriting!" }}
            render={({ field }) => (
              <Input
                {...field}
                label={"New Password"}
                size="sm"
                type="password"
                isInvalid={Boolean(errors.newPassword?.message)}
                className="m-2 w-full md:max-w-full"
                errorMessage={errors.newPassword?.message as string}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Parolni tasdiqlang!",
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                size="sm"
                type="password"
                isInvalid={Boolean(errors.confirmPassword?.message)}
                errorMessage={errors.confirmPassword?.message as string}
                className="m-2 w-full md:max-w-full"
              />
            )}
          />
          <Button
            type="submit"
            className="mt-6 text-white bg-[#000] w-full md:max-w-full"
            color="warning"
            isLoading={loading}
          >
            O'zgartirish
          </Button>
        </div>
      </form>
    </div>
  );
};
