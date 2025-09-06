import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/";

export const getCamps = async () => {
  const request = await axios.get("campers");
  return request.data;
};

export const getCamp = async (id: number) => {
  const request = await axios.get(`campers/${id}`);
  return request.data;
};
