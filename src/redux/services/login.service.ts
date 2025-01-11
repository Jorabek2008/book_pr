import { api } from "../../api";

/* eslint-disable no-unused-vars */
class LoginServices {
  async login(phone: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        phone,
        password,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const loginService = new LoginServices();
