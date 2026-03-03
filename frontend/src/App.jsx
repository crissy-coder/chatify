import {Navigate, Route,Routes} from 'react-router';
import ChatPage from './pages/chatPage';
import LogInPage from './pages/logInPage';
import SingUpPage from './pages/singUpPage';
import {useEffect} from 'react';
import { useUserAuthStore } from './store/userAuthStore';
import PageLoader from './components/pageLoader';
import {Toaster} from 'react-hot-toast';


function App() {
    const {authuser, isCheckingAuth, checkAuth} = useUserAuthStore();
   
    // here we are calling "checkAuth" function on load of app to check whether user is authenticated or not and set the authUser state accordingly. This will help us to persist the login state even after refreshing the page.
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    
    console.log("Auth User in App.jsx:", authuser);
    
    if(isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
         <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
         <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
        <Routes>
            <Route path="/" element={authuser ? <ChatPage /> : <Navigate to={"/signin"} /> } />
            <Route path="/signin" element={!authuser ? <LogInPage /> : <Navigate to={"/"} /> } />
            <Route path="/signup" element={!authuser ? <SingUpPage /> : <Navigate to={"/"} /> } />

             {/* <Route path="/" element={<ChatPage />} />
            <Route path="/signin" element={<LogInPage />} />
             <Route path="/signup" element={<SingUpPage />} /> */}
        </Routes>
        <Toaster/>

     </div>
  )
}
export default App
