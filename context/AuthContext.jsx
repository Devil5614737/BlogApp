import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext(null);



export const AuthContextProvider=({children})=>{
    const router=useRouter()
    const[currentUser,setCurrentUser]=useState();
 

    


useEffect(()=>{
    let user=localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')):null
    setCurrentUser(user)
    if(localStorage.getItem('token')){

        router.push('/blogs')
    }
},[]);



    return (
        <AuthContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}