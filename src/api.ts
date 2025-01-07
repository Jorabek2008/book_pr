import axios from "axios";

export const api = axios.create({
  baseURL: "https://angortakm.uz/api/v1",
  withCredentials: true,
});
