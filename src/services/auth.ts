import AxiosInstance from ".";

type UserType = {
  username?: string;
  password: string;
  email: string;
};

export const register = (user: UserType) => {
  return AxiosInstance().post("/auth/register", user);
};

export const login = (user: UserType) => {
  return AxiosInstance().post("/auth/login", user);
};
