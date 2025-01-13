import { Button, Image, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import { api } from "../../api";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type TForm = {
  id: FormData;
};

export const ChangePassword: FC<TForm> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    setValue,
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

  const editPassword = async () => {
    setValue("oldPassword", id.oldPassword);
    setValue("newPassword", id.newPassword);
    setValue("confirmPassword", id.confirmPassword);
  };

  useEffect(() => {
    editPassword();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full hidden md:w-[50%] h-[50%] md:h-full bg-[#0B6C90] md:flex justify-center items-center">
        <Image
          src="/logotip.jpg"
          alt="logo"
          className="w-[80%] md:w-[431px] h-auto"
        />
      </div>
      <div className="w-full md:w-[50%] h-[50%] md:h-full bg-white flex flex-col items-center justify-center">
        <div className="w-[62px] h-[54px] mb-4 mt-60 md:mt-0">
          <Image src="/logotip.jpg" alt="logo" />
        </div>
        <h1 className="text-[8vw] md:text-[40px] font-bold text-center">
          Change Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0">
          <div className="flex flex-col items-center justify-center mt-4">
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
                  className="m-2 w-full md:max-w-[80%]"
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
                  className="m-2 w-full md:max-w-[80%]"
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
                  className="m-2 w-full md:max-w-[80%]"
                />
              )}
            />
            <Button
              type="submit"
              className="mt-6 text-white bg-[#000] w-full md:max-w-[80%]"
              color="warning"
              isLoading={loading}
            >
              Submit
            </Button>
            <Link
              to={"/admin-login"}
              className="mt-3 text-primary hover:underline"
            >
              Login sahifasiga o'tish
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
