import { useCallback, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../app/actions/user.actions";
import Sidebar from "../components/sidebar";
import MainBar from "../components/mainbar";
import { fetchConversations } from "../services/conversations";
import { postMessage } from "../services/message";
import SocketContext from "../context/socket";

const audio = new Audio("/message.mp3");

function Home() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { user } = useSelector((state: any) => state.user);
  const { currentChat } = useSelector((state: any) => state.current);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();

  const updateConversationMessage = useCallback(
    (index: number, data: any) => {
      const newConversation: any[] = [...conversations];
      newConversation[index].messages = data;
      setConversations(newConversation);
    },
    [conversations]
  );

  const saveMessage = async (body: any) => {
    const { data } = await postMessage(body);
    return data;
  };

  const realtimeMessage = async (body: any, recipientID: string) => {
    try {
      const newMessage = await saveMessage(body);
      setConversations((prev) =>
        prev.map((convo) => {
          if (convo._id === newMessage.conversationID) {
            const newConvo = { ...convo };
            newConvo.messages.push(newMessage);
            if (!newConvo.latestMessage) newConvo.latestMessage = {};

            newConvo.latestMessage = {
              _id: newMessage._id,
              text: newMessage.text,
            };
            return newConvo;
          }
          return convo;
        })
      );
      socket.emit("new-message", newMessage, recipientID);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errRes = error.response.data.message;
        toast.error(
          errRes &&
            errRes === "jwt expired" &&
            "cannot send messages...login first"
        );
        return;
      }
      toast(error.message);
    }
  };

  const updateConversation = useCallback(
    (data: any) => {
      setConversations((prev) =>
        prev.map((convo) => {
          if (convo._id === data.conversationID) {
            toast.success(`[${convo.otherUser.username}]: ${data.text}`);
            const newConvo = { ...convo };
            if (newConvo._id !== currentChat.conversation?.conversationID) {
              newConvo.newMessages = (newConvo.newMessages || 0) + 1;
            }

            if (!newConvo.latestMessage) newConvo.latestMessage = {};
            newConvo.latestMessage = {
              _id: data._id,
              text: data.text,
            };
            if (newConvo.messages) {
              newConvo.messages.push(data);
            }
            return newConvo;
          }
          return convo;
        })
      );
      audio.play();
    },
    [currentChat]
  );

  const removeNewMessages = useCallback((conversationID: string) => {
    setConversations((prev) =>
      prev.map((convo) => {
        if (convo._id === conversationID) {
          const newConvo = { ...convo };
          newConvo.newMessages = 0;
          return newConvo;
        }
        return convo;
      })
    );
  }, []);

  const addOnlineUser = useCallback((userID: string) => {
    setConversations((prev) =>
      prev.map((convo) => {
        if (convo.otherUser._id === userID) {
          const convoCopy = { ...convo };
          convoCopy.otherUser = { ...convoCopy.otherUser, status: "online" };
          return convoCopy;
        }
        return convo;
      })
    );
  }, []);

  const addOfflineUser = useCallback((userID: string) => {
    setConversations((prev) =>
      prev.map((convo) => {
        if (convo.otherUser._id === userID) {
          const convoCopy = { ...convo };
          convoCopy.otherUser = { ...convoCopy.otherUser, status: "offline" };
          return convoCopy;
        }
        return convo;
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getUserProfile(() => {
        navigate("/login");
        window.location.reload();
      })
    );
  }, [dispatch, navigate]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetchConversations();
        const convo = response.data.map((conversation: any) => {
          conversation.messages = null;
          conversation.newMessages = 0;
          conversation.typing = false;
          conversation.otherUser = {
            ...conversation.users.find((us: any) => us._id !== user._id),
            status: "offline",
          };
          delete conversation.users;
          return conversation;
        });
        setConversations(convo);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    socket.on("new-message", updateConversation);
    socket.on("add-online-user", addOnlineUser);
    socket.on("remove-online-user", addOfflineUser);

    return () => {
      socket.off("new-message", updateConversation);
      socket.off("add-online-user", addOnlineUser);
      socket.off("remove-online-user", addOfflineUser);
    };
  }, [socket, updateConversation, addOfflineUser, addOnlineUser]);

  return (
    <div className='flex h-full w-full'>
      <Sidebar
        user={user}
        conversations={conversations}
        loading={loading}
        removeNewMessages={removeNewMessages}
      />
      <MainBar
        userID={user._id}
        conversations={conversations}
        updateConversationMessage={updateConversationMessage}
        realtimeMessage={realtimeMessage}
      />
    </div>
  );
}

export default Home;
