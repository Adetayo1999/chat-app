import AxiosInstance from ".";

export const fetchConversations = () => {
  return AxiosInstance().get("/conversation/all");
};
