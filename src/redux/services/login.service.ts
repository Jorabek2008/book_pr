import { api } from "../../api";

class LoginServices {
  async login(phone: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        phone,
        password,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
}

export const loginService = new LoginServices();
