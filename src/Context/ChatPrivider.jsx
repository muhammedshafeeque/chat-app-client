// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext=createContext()

// const ChatProvider=({children})=>{
//     const [user,setUser]=useState() 
//     const [selectedChat,setSelectedChat]=useState() 
//     const [chats,setChats]=useState() 
//     const navigate=useNavigate() 
//     useEffect(()=>{
//         const userInfo=JSON.parse(localStorage.getItem("userInfo"))
//         setUser(userInfo)
//         if(!userInfo){
//             navigate('/')
//         }else{
//             navigate('/chat')
//         }
//     },[navigate,setUser])
//     return <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>
//         {children}
//     </ChatContext.Provider>
// }
// export default ChatProvider
// export const Store=()=>{
//     return useContext(ChatContext)
// }

import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext =createContext(null)

function Store({children}){
    const [user,setUser]=useState(null) 
    const [selectedChat,setSelectedChat]=useState(null) 
    const [chats,setChats]=useState([]) 
    const navigate=useNavigate() 
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if(!userInfo){
            navigate('/')
        }else{
            navigate('/chat')
        }
    },[navigate,setUser])

    return(
        <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}} >
            {children}
        </ChatContext.Provider>
    )
}
export default  Store