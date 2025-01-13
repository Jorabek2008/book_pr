import { api } from "../../api";

class LogoutServices {
  async logout(success: string, message: string) {
    try {
      const response = await api.get("/auth/logout", {
        params: {
          success,
          message,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const logoutService = new LogoutServices();
