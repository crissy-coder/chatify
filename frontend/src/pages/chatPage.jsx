import React from 'react'
import { useUserAuthStore } from '../store/userAuthStore';

function ChatPage() {
        const {authuser, login, isLoggingIn} = useUserAuthStore();
  return (
    <div>
      chatpage
    </div>
  )
}

export default ChatPage
