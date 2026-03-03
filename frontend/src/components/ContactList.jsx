import React from 'react'
import { useEffect } from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useUserAuthStore } from "../store/userAuthStore";




function ContactList() {
      const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore();
      const { onlineUsers } = useUserAuthStore();

      useEffect(() => {
        getAllContacts();
      }, [getAllContacts]); 
      if(isUsersLoading) return <UsersLoadingSkeleton/>
      console.log(allContacts, "contact");
  return (
    <div>
        {allContacts.map((contact) => (
        <div
          key={contact}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                {/* <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} /> */}
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.username}</h4>
        
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList
