import { ErrorMessage, Field } from "formik";

type InputType = {
  type: "text" | "password";
  labelName: string;
  inputName: string;
};

function Input({ type, labelName, inputName }: InputType) {
  return (
    <div className='w-full mb-8'>
      <label htmlFor={inputName} className='block   text-sm text-[#B0B0B0]'>
        {labelName}
      </label>
      <Field
        type={type}
        name={inputName}
        className='w-full py-2 outline-none h-10 border-b border-[#D5DFEE] font-semibold focus:border-b-2 focus:border-[#3A8DFF]'
      />
      <div className='text-xs text-red-600 mt-2 h-2 w-full'>
        <ErrorMessage component='span' name={inputName} />
      </div>
    </div>
  );
}

export default Input;
