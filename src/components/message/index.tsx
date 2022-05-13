import moment from "moment";

type MessageProps = {
  message: {
    userImage?: string;
    createdAt: string;
    text: string;
  };
  username?: string;
  user?: boolean;
};
function Message({ message, username, user }: MessageProps) {
  const { createdAt, text } = message;
  return (
    <div className={`flex  ${user && "justify-end "} items-center mb-3`}>
      {username && (
        <div className='mr-3'>
          <img
            src={`https://ui-avatars.com/api/?size=35&font-size=0.26&background=random&rounded=true&name=${username}&bold=true`}
            alt={username}
          />
        </div>
      )}
      <div className='mb-2'>
        <small className={`text-[#BECCE2] ${user && "text-right block"}`}>
          {!user && <span className='mr-1'>{username}</span>}
          <span>{moment(createdAt).fromNow()}</span>
        </small>
        <p
          className={`w-fit  p-3 rounded-[0.625rem] ${
            user ? "rounded-tr-none" : "rounded-tl-none"
          } text-sm ${
            user ? "bg-[#F4F6FA] text-[#91A3C0]" : "bg-message text-[#fff]"
          }`}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default Message;
