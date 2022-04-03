import { Box } from '@chakra-ui/react'
import React from 'react'
import ChatBox from '../../Components/Chat/ChatBox/ChatBox'
import MyChats from '../../Components/Chat/MyChats/MyChats'
import Header from '../../Components/Miscellaneous/Header/Header'
import './chatpage.scss'
function ChatPage() {
  return (
    <div className="chat_Home_page">
         <Header/>
      <Box className='master_Box'>
        <MyChats/>
        <ChatBox/>
     
      </Box>
      
    </div>
  )
}

export default ChatPage