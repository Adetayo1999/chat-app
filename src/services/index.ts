import axios from "axios";

const SERVER_URL: any = process.env.REACT_APP_SERVER_URL;

const AxiosInstance = () => {
  const config: any = {
    baseURL: SERVER_URL,
    headers: {},
    withCredentials: true,
  };
  config.headers["x-access-token"] = localStorage.getItem("chat-app-token");
  return axios.create(config);
};

export default AxiosInstance;
