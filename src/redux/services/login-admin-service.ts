import { api } from "../../api";

interface LoginData {
  email: string;
  password: string;
}

export const loginAdminService = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutAdminService = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const userService = async () => {
  const response = await api.get("/auth/profile");
  return response?.data || null;
};
