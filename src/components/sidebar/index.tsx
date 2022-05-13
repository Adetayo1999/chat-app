import { useState } from "react";
import { useSelector } from "react-redux";
import { MoreIcon, SearchIcon } from "../../assets/svg";
import Chat from "../chat";
import StatusImage from "../status-image";

type SidebarType = {
  user: {
    username: string;
    online: "online" | "offline";
    _id: string;
  };
  loading: boolean;
  conversations: any[];
  removeNewMessages: (conversationID: string) => void;
};

function Sidebar({
  user,
  loading,
  conversations,
  removeNewMessages,
}: SidebarType) {
  const { username, online } = user;
  const [toggleButton, setToggleButton] = useState(false);
  const { sidebarModal } = useSelector((state: any) => state.modals);
  return (
    <div
      className={`md:flex-[0.3] p-4 overflow-hidden border-r border-gray-200 border-opacity-40 z-50  ${
        sidebarModal
          ? "translate-x-0 transition fixed bg-white z-50 h-screen shadow-lg"
          : "translate-x-[-100vw] transition  absolute"
      } md:block md:static md:h-full md:translate-x-0 md:shadow-none`}>
      {/* User Status */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <StatusImage username={username} status={online} />
          <p className='ml-5 font-bold text-gray-800 lowercase'>{username}</p>
        </div>
        <div className='relative'>
          <button
            type='button'
            className=' w-8 h-8 flex justify-center items-center hover:bg-gray-100 hover:rounded-full'
            onClick={() => setToggleButton((prev) => !prev)}>
            <MoreIcon />
          </button>
          {toggleButton && (
            <div className='bg-white rounded-sm w-32 h-32 shadow-md absolute z-40 -left-28 transition'>
              <button
                type='button'
                className='text-center w-full p-2 text-sm bg-gray-100'
                onClick={() => {
                  localStorage.removeItem("chat-app-token");
                  window.location.reload();
                }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Users */}
      <div className='my-8'>
        <h2 className='mb-3 font-semibold text-xl '>Chats</h2>
        <div className='flex items-center w-[100%] h-[3.125rem] bg-[#E9EEF9] rounded-md px-2'>
          <SearchIcon scale={1.2} />
          <input
            type='text'
            name='search'
            id=''
            placeholder='Search'
            className='bg-transparent outline-none flex-1 h-full ml-3 text-[#ADC0DE] placeholder:text-[#ADC0DE]'
          />
        </div>
      </div>
      {/* Chats h-4/6 overflow-y-scroll */}
      {loading ? (
        <p>Loading chats...</p>
      ) : (
        <div className=''>
          {conversations.map((conversation: any, index) => (
            <Chat
              key={conversation._id}
              removeNewMessages={removeNewMessages}
              index={index}
              user={conversation?.otherUser}
              conversation={{
                lastMessage: conversation.latestMessage?.text,
                conversationID: conversation._id,
                newMessages: conversation.newMessages,
                ...conversation,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
