import { api } from "../../api";

interface LoginData {
  email: string;
  password: string;
  // Add other fields as needed
}

export const loginAdminService = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};


