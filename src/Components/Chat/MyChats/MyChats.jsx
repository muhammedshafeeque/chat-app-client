import React from 'react'
import './mychats.scss'
import {Box, Stack} from '@chakra-ui/react'
import Store from '../../../Context/ChatPrivider'
function MyChats() {
    const {chat,selectedChat}=Store()
    console.log(chat)
  return (
    <Box className='mychats'>
        <Box className='header'>
            <h3>My Chats</h3>
        </Box>
        <Box className='mychat_list_area'>
            {chat?<Stack overflow={'scroll'} >
                {chat.map((Chat)=>{
                    return <Box  className={selectedChat===Chat?'row_selected':"row"}>
                            nmbmb
                    </Box>
                })}
                </Stack>:''}
        </Box>
    </Box>
  )
}

export default MyChats