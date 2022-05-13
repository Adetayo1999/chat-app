import userReducer from "./user.reducer";
import conversationsReducer from "./conversations.reducer";
import currentChatReducer from "./current-chat.reducer";
import modalsReducer from "./modals.reducer";

const reducer = {
  user: userReducer,
  conversations: conversationsReducer,
  current: currentChatReducer,
  modals: modalsReducer,
};

export default reducer;
