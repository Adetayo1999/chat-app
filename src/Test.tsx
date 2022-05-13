import React, { useContext, useEffect, useState, useCallback } from "react";
import SocketContext from "./context/socket";

type MessageType = {
  name: string;
  text: string;
  time: Date;
};

function App() {
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [isTyping, setIsTyping] = useState("");
  const socket = useContext(SocketContext);

  const addMessageToConversation = useCallback((data: MessageType) => {
    setMessages((prev) => [...prev, data]);
  }, []);

  const handleSubmit = () => {
    const data = { name: user, text, time: new Date() };
    console.log(data);
    addMessageToConversation(data);
    socket.emit("new-message", data);
    setText("");
  };

  useEffect(() => {
    socket.on("new-user", (data) => {
      console.log(data);
    });
    socket.on("new-message", addMessageToConversation);
    socket.on("typing", (data) => setIsTyping(data));
    socket.on("stop-typing", () => setIsTyping(""));

    return () => {
      socket.off("new-message", addMessageToConversation);
      socket.off("typing", (data) => setIsTyping(data));
      socket.off("stop-typing", () => setIsTyping(""));
    };
  }, [socket, addMessageToConversation]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setText(e.target.value);
    socket.emit("typing", `${user} is typing...`);
  };

  return (
    <div className='App'>
      <h1>Some Socket Stuffs</h1>
      <input
        type='text'
        name=''
        id=''
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type='text'
        name=''
        id=''
        value={text}
        onChange={handleChange}
        onBlur={() => socket.emit("stop-typing")}
      />
      <button onClick={handleSubmit}>SEND</button>
      <br />
      {messages &&
        messages.map((message, index) => (
          <p key={index}>
            [{message.name}]: {message.text}
          </p>
        ))}
      {isTyping && <b>{isTyping}</b>}
    </div>
  );
}

export default App;
