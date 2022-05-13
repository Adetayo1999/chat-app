import React from "react";
import { io } from "socket.io-client";

export const socket = io("ws://localhost:8080");

const SocketContext = React.createContext(socket);

export default SocketContext;
