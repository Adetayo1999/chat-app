import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import AuthLayout from "../Layout/AuthLayout";
import { initialRegisterState, registerSchema } from "../schema/auth.schema";
import { register } from "../services/auth";

function Register() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className='p-10'>
        <div className='flex justify-end  items-center'>
          <p className='text-[#B0B0B0] text-xs mr-4 md:mr-6 md:text-sm'>
            Already have an account?
          </p>
          <Button
            text='Login'
            variant='primary-outline'
            type='button'
            clickHandler={() => navigate("/login")}
          />
        </div>
        <div className='flex w-full  flex-col justify-center items-center md:block md:w-[70%] mx-auto mt-10'>
          <h1 className='text-[1.6rem] font-medium mb-8'>Create an account.</h1>
          <div className='w-full'>
            <Formik
              validationSchema={registerSchema}
              initialValues={initialRegisterState}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  setSubmitting(true);
                  const response: any = await register(values);
                  toast.success(response.data.message);
                  setSubmitting(false);
                  resetForm();
                } catch (error: any) {
                  toast.error(
                    (error.response && error.response?.data?.message) ||
                      error.message
                  );
                  setSubmitting(false);
                }
              }}>
              {({ isSubmitting }) => (
                <Form className='w-full'>
                  <Input
                    type='text'
                    labelName='Username'
                    inputName='username'
                  />
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
                      {isSubmitting ? "Loading" : "Create"}
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

export default Register;
