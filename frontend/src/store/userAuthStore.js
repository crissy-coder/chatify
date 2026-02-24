import { create  } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useUserAuthStore = create((set) => ({
    // authuser : {name:"Vikas", _id: 342, age:25},
    // isLoggingIn : false,
    // idsLoading : false,

    // login: () => {
    //     set({isLoggingIn : true});
    // }

    authUser: null,
    isCheckingAuth: true, // this will check  on load whether user is authenticated or not
    isSigningUp: false,




    checkAuth: async () => {
        try{
        const res = await axiosInstance.get("/auth/check");
        set({authUser:res.data}) // res.data is user object from backend
        }catch(err){
            console.error("Error checking auth:", err);
            set({authUser: null});
        }finally {
            set({isCheckingAuth: false}); // we success of fail - eventually ischeckingAuth should be false 
        }
    },

    signup : async (data) => {
        set({isSigningUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup", data); // data is {fullName, email, password} and send to backend to our api route /auth/signup
            set({authUser: res.data}); // res.data is user object from backend after successful signup which which are assign to "authUser"
            
            toast.success("Signup successful!"); // show success toast after successful signup
      
        }catch(err){
            // "err.response.data.message" error the way we show error  in axios 
            toast.error(err.response?.data?.message || "Signup failed!"); // show error toast if signup fails, and show error message from backend if available
            console.error("Error during signup:", err);
        }finally {
            set({isSigningUp: false});
        }
    }






}));