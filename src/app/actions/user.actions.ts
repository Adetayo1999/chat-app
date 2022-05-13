import toast from "react-hot-toast";
import { socket } from "../../context/socket";
import { fetchProfile } from "../../services/user";
import { get, success, failure } from "../reducers/user.reducer";

export const getUserProfile = (cb: any) => async (dispatch: any) => {
  dispatch(get());
  try {
    const response = await fetchProfile();
    dispatch(success({ ...response.data, online: "online" }));
    socket.emit("go-online", response.data._id);
  } catch (error: any) {
    dispatch(failure(error.response.data || error.message));
    toast.error(error.response.data.message);
    localStorage.removeItem("chat-app-token");
    cb();
  }
};
