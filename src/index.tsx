import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import SocketContext, { socket } from "./context/socket";
import store from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <Toaster position='top-right' reverseOrder={false} />
        <App />
      </Provider>
    </SocketContext.Provider>
  </React.StrictMode>
);
