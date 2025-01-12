import { Button, Image, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../../../redux/store"; // Import the AppDispatch type
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../../api";

interface FormData {
  email: string;
  password: string;
}

export const AdminLogin = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { loading } = useSelector((state: RootState) => state.loginAdmin);

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/auth/login", data);
      window.location.href = "/admin";
    } catch (error) {
      console.log(error);
    }
  };

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
          Login
        </h1>
        <hr className="w-[50%] md:w-[200px] mx-auto h-[2px] bg-[#000] my-2" />
        <p className="text-center text-[5vw] md:text-[20px] text-gray-500 mb-4">
          Sign into your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0">
          <div className="flex flex-col items-center justify-center mt-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Emailgizni kiriting!" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={"Email"}
                  size="sm"
                  isInvalid={Boolean(errors.email?.message)}
                  className="m-2 w-full md:max-w-[80%]"
                  errorMessage={errors.email?.message as string}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Passwordgizni kiriting!" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={"Password"}
                  size="sm"
                  type="password"
                  isInvalid={Boolean(errors.password?.message)}
                  className="m-2 w-full md:max-w-[80%]"
                  errorMessage={errors.password?.message as string}
                />
              )}
            />
            <Button
              type="submit"
              className="mt-6 text-white bg-[#000] w-full md:max-w-[80%]"
              color="warning"
              isDisabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <div className="flex justify-between gap-x-[310px]">
              <Link to={"/"} className="mt-3 text-primary">
                Bosh sahifaga o'tish
              </Link>
              <Link to={"/change-password"} className="mt-3 text-primary">
                Passwordni o'zgartirish
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
