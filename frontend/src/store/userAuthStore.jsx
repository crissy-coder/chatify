import { create  } from "zustand";

export const useUserAuthStore = create((set) => ({
    authuser : {name:"Vikas", _id: 342, age:25},
    isLoggingIn : false,
    idsLoading : false,

    login: () => {
        set({isLoggingIn : true});
    }
}));