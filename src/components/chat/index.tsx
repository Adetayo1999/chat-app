import { useDispatch } from "react-redux";
import StatusImage from "../status-image";
import { set } from "../../app/reducers/current-chat.reducer";
import { toggle } from "../../app/reducers/modals.reducer";

type ChatType = {
  index: number;
  user: {
    username: string;
    status: "online" | "offline";
  };
  conversation: {
    conversationID: string;
    newMessages?: number;
    lastMessage?: string;
    typing?: boolean;
  };
  removeNewMessages: (conversationID: string) => void;
};

function Chat({ conversation, user, index, removeNewMessages }: ChatType) {
  const dispatch: any = useDispatch();
  const { newMessages, lastMessage, typing } = conversation;

  const handleClick = () => {
    const payload = { user, conversation, index };
    dispatch(set(payload));
    removeNewMessages(conversation.conversationID);
    dispatch(toggle());
  };

  return (
    <button
      onClick={handleClick}
      className='p-4 hover:bg-gray-100 mb-2 hover:cursor-pointer rounded flex justify-between items-center w-full overflow-hidden'>
      <div className='flex'>
        <StatusImage username={user.username} status={user.status} />
        <div className='ml-4 '>
          <h4 className='font-semibold text-left'>{user.username}</h4>
          <p
            className={` ${
              typing ? "text-green-500" : "text-[#9CADC8]"
            } w-[80%] text-left  truncate ${typing && "italic"} text-xs ${
              newMessages && "font-medium text-black"
            }`}>
            {typing ? "Typing..." : lastMessage}
          </p>
        </div>
      </div>
      <div className=''>
        {newMessages !== 0 && (
          <span className='min-w-[1.25rem] flex justify-center items-center h-[1.25rem] text-[0.65rem] p-2 text-white rounded-full bg-[#3F92FF]'>
            {newMessages}
          </span>
        )}
      </div>
    </button>
  );
}

export default Chat;
