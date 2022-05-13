import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../app/reducers/modals.reducer";
import { EmojiIcon, FileIcon, MoreIcon } from "../../assets/svg";
import { fetchMessages } from "../../services/message";
import Button from "../button";
import Message from "../message";

function Messanger({
  currentChat,
  userID,
  conversations,
  updateConversationMessage,
  realtimeMessage,
}: MessangerType) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const messageRef: any = useRef();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await fetchMessages(
          currentChat.conversation.conversationID
        );
        updateConversationMessage(currentChat.index, response.data);
        messageRef?.current?.scrollIntoView({ behaviour: "smooth" });

        setLoading(false);
      } catch (error: any) {
        toast.error(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message
        );
        setLoading(false);
      }
    };

    if (!conversations[currentChat.index]?.messages) {
      getMessages();
    }
  }, [currentChat, conversations, updateConversationMessage]);

  useEffect(() => {
    if (messageRef?.current) {
      messageRef?.current?.scrollIntoView({ behaviour: "smooth" });
    }
  }, [conversations, currentChat]);

  const loadMessages = useCallback(() => {
    if (loading) {
      return <p>Messages Loading</p>;
    }
    if (
      conversations[currentChat.index]?.messages &&
      conversations[currentChat.index]?.messages?.length === 0
    ) {
      return <p>No Messages Here</p>;
    }
    return (
      conversations[currentChat.index]?.messages &&
      conversations[currentChat.index]?.messages.map(
        (message: any, index: number) => {
          if (message.senderID === userID) {
            return (
              <div
                ref={
                  (index ===
                    conversations[currentChat.index].messages.length - 1 &&
                    messageRef) ||
                  null
                }
                key={message._id}>
                <Message user message={message} />
              </div>
            );
          }
          return (
            <div
              ref={
                (index ===
                  conversations[currentChat.index].messages.length - 1 &&
                  messageRef) ||
                null
              }
              key={message._id}>
              <Message message={message} username={currentChat.user.username} />
            </div>
          );
        }
      )
    );
  }, [conversations, currentChat, loading, userID]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      text,
      conversationID: currentChat.conversation.conversationID,
    };
    await realtimeMessage(data, currentChat.user._id);
    setText("");
  };

  return (
    <>
      <div className='flex justify-between items-center px-6 py-8 shadow-active'>
        <div className='flex items-center'>
          <h3 className='mr-5 font-bold text-gray-800 text-lg'>
            {currentChat.user.username}
          </h3>
          <p className='text-sm flex justify-center items-center'>
            <span
              className={`w-2 h-2  mr-2 rounded-full ${
                conversations[currentChat.index]?.otherUser?.status === "online"
                  ? "bg-[#1CED84]"
                  : "bg-[#D0DAE9]"
              }`}
            />
            <span className='text-[#BFC9DB] text-sm'>
              {conversations[currentChat.index]?.otherUser?.status || "Offline"}
            </span>
          </p>
        </div>
        <div className='md:hidden'>
          <button
            type='button'
            className='w-10 h-10 flex justify-center items-center bg-gray-100 rounded-full'
            onClick={() => {
              dispatch(toggle());
            }}>
            <MoreIcon scale={1.5} />
          </button>
        </div>
      </div>
      <div className='px-6 py-4 h-[60%] overflow-y-scroll'>
        {loadMessages()}
      </div>

      <div className='bg-white  absolute p-6 bottom-0 w-full'>
        <div className='w-[90%] mx-auto px-5  h-[4rem] flex justify-between items-center bg-[#F4F6FA] rounded-lg'>
          <form action='' className='flex-1 mr-4' onSubmit={handleSubmit}>
            <input
              type='text'
              name='messae'
              id=''
              placeholder='Type something...'
              className=' h-full w-full outline-none bg-transparent text-[#9CADC8] text-sm'
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </form>
          <div className='flex'>
            <EmojiIcon />
            <div className='mx-2' />
            <FileIcon />
          </div>
        </div>
      </div>
    </>
  );
}

type MainBarType = {
  userID: string;
  conversations: any[];
  updateConversationMessage: (index: number, data: any) => void;
  realtimeMessage: (body: any, recipientID: string) => void;
};

function MainBar({
  userID,
  conversations,
  realtimeMessage,
  updateConversationMessage,
}: MainBarType) {
  const { currentChat } = useSelector((state: any) => state.current);
  const dispatch = useDispatch();
  const isCurrent = Object.keys(currentChat).length > 0;
  return (
    <div className='md:flex-[0.7] relative w-full'>
      {!isCurrent ? (
        <div className='p-6'>
          <p className='text-xl mb-4 md:text-2xl text-gray-700'>
            Click a chat to start a conversation
          </p>
          <div className='block md:hidden'>
            <Button
              type='button'
              variant='primary'
              text='Start Here'
              clickHandler={() => {
                dispatch(toggle());
              }}
            />
          </div>
        </div>
      ) : (
        <Messanger
          userID={userID}
          currentChat={currentChat}
          conversations={conversations}
          updateConversationMessage={updateConversationMessage}
          realtimeMessage={realtimeMessage}
        />
      )}
    </div>
  );
}

export default MainBar;

type MessangerType = {
  userID: string;
  realtimeMessage: (body: any, recipientID: string) => void;
  updateConversationMessage: (index: number, data: any) => void;
  conversations: any[];
  currentChat: {
    index: number;
    conversation: {
      lastMessage: string;
      conversationID: string;
    };
    user: {
      _id: string;
      username: string;
      status: "online" | "offline";
    };
  };
};
