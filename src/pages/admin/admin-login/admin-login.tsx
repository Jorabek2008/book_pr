import { Button, Image, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { loginAdmin } from "../../../redux/slice/login-admin-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store"; // Import the AppDispatch type

interface FormData {
  email: string;
  password: string;
  // Add other fields as needed
}

export const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { loading } = useSelector((state: RootState) => state.loginAdmin);
  const onSubmit = (data: FormData) => {
    dispatch(loginAdmin({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full hidden md:w-[50%] h-[50%] md:h-full bg-[#0B6C90] md:flex justify-center items-center">
        <Image
          src="/logoLogin.png"
          alt="logo"
          className="w-[80%] md:w-[431px] h-auto"
        />
      </div>
      <div className="w-full md:w-[50%] h-[50%] md:h-full bg-white flex flex-col items-center justify-center">
        <div className="w-[62px] h-[54px] mb-4 mt-60 md:mt-0">
          <Image src="/logo.png" alt="logo" />
        </div>
        <h1 className="text-[8vw] md:text-[40px] font-bold text-center">
          Login
        </h1>
        <hr className="w-[50%] md:w-[200px] mx-auto h-[2px] bg-[#FF9500] my-2" />
        <p className="text-center text-[5vw] md:text-[20px] text-[#FF9500] mb-4">
          Sign into your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0">
          <div className="flex flex-col items-center justify-center mt-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={"Email"}
                  size="sm"
                  isInvalid={Boolean(errors.email?.message)}
                  className="m-2 w-full md:max-w-[80%]"
                  isRequired
                  errorMessage={errors.email?.message as string}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={"Password"}
                  size="sm"
                  type="password"
                  isInvalid={Boolean(errors.password?.message)}
                  className="m-2 w-full md:max-w-[80%]"
                  isRequired
                  errorMessage={errors.password?.message as string}
                />
              )}
            />
            <Button
              type="submit"
              className="mt-6 text-white w-full md:max-w-[80%]"
              color="warning"
              isDisabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
