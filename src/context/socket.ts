import React from "react";
import { io } from "socket.io-client";

const SOCKET_URL: any = process.env.REACT_APP_SOCKET_URL;

export const socket = io(SOCKET_URL);

const SocketContext = React.createContext(socket);

export default SocketContext;
