import React from 'react'
import { useUserAuthStore } from '../store/userAuthStore';

function LogInPage() {

  const {authuser, login, isLoggingIn} = useUserAuthStore();


  return (
    <div>
      <button onClick={login} className='z-10'>Login</button>
    </div>
  )
}

export default LogInPage
