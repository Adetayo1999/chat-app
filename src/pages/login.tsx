import { Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Button from "../components/button";
import Input from "../components/input";
import AuthLayout from "../Layout/AuthLayout";
import { initialLoginState, loginSchema } from "../schema/auth.schema";
import { login } from "../services/auth";
import { success } from "../app/reducers/user.reducer";
import SocketContext from "../context/socket";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    localStorage.removeItem("chat-app-token");
  }, []);

  return (
    <AuthLayout>
      <div className='p-10'>
        <div className='flex justify-end  items-center'>
          <p className='text-[#B0B0B0] text-xs mr-4 md:mr-6 md:text-sm'>
            Don’t have an account?
          </p>
          <Button
            text='Create account'
            variant='primary-outline'
            type='button'
            clickHandler={() => navigate("/register")}
          />
        </div>
        <div className='flex w-full  flex-col justify-center items-center md:block md:w-[70%] mx-auto mt-10'>
          <h1 className='text-[1.6rem] font-medium mb-8'>Welcome back!</h1>
          <div className='w-full'>
            <Formik
              validationSchema={loginSchema}
              initialValues={initialLoginState}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  setSubmitting(true);
                  const {
                    data: { token, user },
                  } = await login(values);
                  toast.success("LOGIN SUCCESS");
                  localStorage.setItem("chat-app-token", token);
                  dispatch(success({ ...user, online: "online" }));
                  resetForm();
                  socket.emit("go-online", user._id);
                  window.location.replace("/");
                } catch (error: any) {
                  setSubmitting(false);
                  toast.error(
                    (error.response && error.response?.data?.message) ||
                      error.message
                  );
                }
              }}>
              {() => (
                <Form className='w-full'>
                  <Input
                    type='text'
                    labelName='E-mail address'
                    inputName='email'
                  />
                  <Input
                    type='password'
                    labelName='Password'
                    inputName='password'
                  />
                  <div className='text-center flex justify-center items-center'>
                    <Button type='submit' variant='primary'>
                      Login
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
