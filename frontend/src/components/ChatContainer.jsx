import { useEffect } from "react";
import {useChatStore} from "../store/useChatStore";
import { useUserAuthStore } from "../store/userAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";



function ChatContainer() {
  const  {messages} = useChatStore();
  const {authUser} = useUserAuthStore();
  const selectedUser = useChatStore((state) => state.selectedUser);
const getMessagesByUserId = useChatStore((state) => state.getMessagesByUserId);

  // useEffect( () => {
  //   getMessagesByUserId(selectedUser._id);
  // }, [selectedUser, getMessagesByUserId])

//   useEffect(() => {
//   if (selectedUser?._id) {
//     // getMessagesByUserId(selectedUser._id);
//     // useChatStore.getState().getMessagesByUserId(selectedUser._id);
//         useChatStore.getState().getMessagesByUserId(selectedUser._id);

//   }
//   console.log("Selected User:", selectedUser);
// }, [selectedUser]);
useEffect(() => {
  console.log("Effect triggered");

  if (!selectedUser?._id) {
    console.log("No valid userId");
    return;
  }

  console.log("Calling function now");

  getMessagesByUserId(selectedUser._id);

}, [selectedUser]);
   // if selectedUser changes, then getMessagesByUserId will called and fetch messages for the new user

  return (
    <div>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0  ? (
          <p>Some Messages</p>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.username} />
        )}
      </div>

      
    </div>
  )
}

export default ChatContainer
