/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

export const useGetUser = () => {
  const { user } = useSelector((state: any) => state.user);
  return user || null;
};
