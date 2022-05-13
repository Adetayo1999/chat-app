type BaseButtonProps = {
  type: "submit" | "button" | "reset";
  clickHandler?: (e: React.SyntheticEvent) => void;
  variant: "primary" | "primary-outline";
};

type ButtonPropsWithText = BaseButtonProps & {
  text: string;
  children?: never;
};

type ButtonPropsWithChild = BaseButtonProps & {
  children: React.ReactNode;
  text?: never;
};

type ButtonProps = ButtonPropsWithText | ButtonPropsWithChild;

function Button({ text, children, type, clickHandler, variant }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={` w-[8rem] md:w-[10rem] h-[2.5rem] md:h-[3.5rem] rounded-[0.188rem] flex justify-center items-center text-[0.875rem] font-semibold ${
        variant === "primary"
          ? "bg-[#3A8DFF] text-[#fff]"
          : "bg-[#fff] text-[#3A8DFF] shadow-button"
      }`}>
      {text || children}
    </button>
  );
}

export default Button;
