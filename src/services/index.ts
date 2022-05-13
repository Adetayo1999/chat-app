import axios from "axios";

const AxiosInstance = () => {
  const config: any = {
    baseURL: "http://localhost:8080/api/v1",
    headers: {},
    withCredentials: true,
  };
  config.headers["x-access-token"] = localStorage.getItem("chat-app-token");
  return axios.create(config);
};

export default AxiosInstance;
