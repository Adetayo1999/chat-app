import AxiosInstance from ".";

export const fetchProfile = () => {
  return AxiosInstance().get("/user");
};
