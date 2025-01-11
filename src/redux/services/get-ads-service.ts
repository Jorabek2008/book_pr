import { api } from "../../api";

export const getAdsService = async () => {
  const response = await api.get(`/posts/get-all-posts`);
  return response.data;
};
