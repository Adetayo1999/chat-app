import * as Yup from "yup";

export const initialLoginState = {
  password: "",
  email: "",
};

export const loginSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: Yup.string().email().required(),
});

export const initialRegisterState = {
  username: "",
  password: "",
  email: "",
};

export const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8, "Password must be 8 chars or more"),
  email: Yup.string().email().required(),
});
