import { useEffect } from "react";
import {useChatStore} from "../store/useChatStore";
import { XIcon } from "lucide-react";



function ChatHeader() {
  const {selectedUser, setSelectedUser} = useChatStore();

  useEffect(() => {
    const handelEscKey = (e) => {
      if(e.key === "Escape") setSelectedUser(null);
  };

  window.addEventListener("keydown", handelEscKey);

  return () => window.removeEventListener("keydown", handelEscKey);
}, [setSelectedUser]);


  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/40 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
         <div className="avator online">
          <div className="w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.username} />
          </div>
         </div>
          <div>
            <h6 className="text-slate-200 font-medium">{selectedUser.username}</h6>
            <p className="text-slate-400 text-sm">Online</p>
          </div>
      </div>
        <button onClick={() => setSelectedUser(null)}>
            <XIcon className="size-5 text-slate-400 hover:text-slate-200 transition-colors"/>
          </button>
    </div>
  )
}

export default ChatHeader
