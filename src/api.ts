import axios from "axios";

export const api = axios.create({
  baseURL: "https://sherobod-takm.uz/api/v1",
  withCredentials: true,
});
