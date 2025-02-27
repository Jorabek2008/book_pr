import { Button, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "../../api";
import axios from "axios";
import { useState } from "react";
import { YandexMap } from "../yandex-maps";

interface CreateContact {
  message: string;
  email: string;
  phone: string;
  name: string;
}
export const Contact = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateContact>();

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data: CreateContact) => {
    setLoading(true);
    try {
      const response = await api.post("/contact", data);
      console.log("Response:", response.data); // Yuborilgan javobni ko'rish
      toast.success("Xabaringiz muvaffaqiyatli yuborildi");
      reset({
        message: "",
        email: "",
        phone: "",
        name: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        console.error("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-[1200px] mx-auto py-[25px]">
        <h1 className="text-[8vw] sm:text-[38px] text-[#030522] poppins-bold leading-[61px] max-lg:ml-[15%]">
          Aloqa
        </h1>

        <div className="flex flex-col md:flex-row justify-between bg-[#F6F1F1] mt-10">
          <div className="w-full md:w-[48%]">
            <YandexMap />
          </div>
          <div className="w-full px-7 md:w-[48%] pt-[50px] mr-5 md:pt-[100px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Ismingizni kiriting!" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Ism"}
                      size="sm"
                      isInvalid={Boolean(errors.name?.message)}
                      className="w-full md:w-[48%] mb-3 md:mb-0"
                      errorMessage={errors.name?.message as string}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Emailingizni kiriting!" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Email"}
                      size="sm"
                      isInvalid={Boolean(errors.email?.message)}
                      className="w-full md:w-[48%]"
                      errorMessage={errors.email?.message as string}
                    />
                  )}
                />
              </div>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Telefon nomeringizni kiriting!" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Phone"}
                    size="sm"
                    isInvalid={Boolean(errors.phone?.message)}
                    className="w-full mt-3"
                    errorMessage={errors.phone?.message as string}
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                rules={{ required: "Xabarni kiriting!" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label={"Xabar"}
                    size="sm"
                    isInvalid={Boolean(errors.message?.message)}
                    className="w-full mt-3"
                    errorMessage={errors.message?.message as string}
                  />
                )}
              />
              <Button
                type="submit"
                isLoading={loading}
                className="bg-[#030522] text-white mt-3 w-full max-lg:mb-5 max-lg:mt-5"
              >
                Jo'natish
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
