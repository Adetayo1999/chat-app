import { fetchConversations } from "../../services/conversations";
import { success, get, failure } from "../reducers/conversations.reducer";

export const getConversations = () => async (dispatch: any) => {
  dispatch(get());
  try {
    const response = await fetchConversations();
    const conversations = response.data.map((conversation: any) => {
      conversation.messages = null;
      return conversation;
    });
    dispatch(success(conversations));
  } catch (error: any) {
    dispatch(failure(error.response.data || error.message));
  }
};
