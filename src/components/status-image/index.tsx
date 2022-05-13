type StatusType = {
  username: string;
  status: "online" | "offline";
};

function StatusImage({ username, status }: StatusType) {
  return (
    <div className='relative w-10'>
      <img
        src={`https://ui-avatars.com/api/?size=50&font-size=0.3&background=random&rounded=true&name=${username}&bold=true`}
        className=''
        alt=''
      />
      <span
        className={`w-[0.8rem] -right-[0.2rem] top-6 absolute h-[0.8rem] rounded-full border-2 border-[#ffffff] ${
          status === "online" ? "bg-[#1CED84]" : "bg-[#D0DAE9]"
        }`}
      />
    </div>
  );
}

export default StatusImage;
