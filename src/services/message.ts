import AxiosInstance from ".";

export const fetchMessages = (conversationID: string) => {
  return AxiosInstance().get(`/message/${conversationID}`);
};

export const postMessage = (data: any) => {
  return AxiosInstance().post("/message/add", data);
};
