import { Box, Text } from '@chakra-ui/react'
import React from 'react'

import './scrollableChat.scss'
function ScrollableChat(messages) {
   const user=JSON.parse(localStorage.getItem('userInfo'))


  return (
   <div w={'100%'}>
     { messages.messages.map((message)=>{
       return(
       <Box key={message._id} className={message.senderId===user.id?'send_message':'resive_mesage'} >
         <Text>{message.content}</Text>
       </Box>)
     })
     }
   </div>
  )
}

export default ScrollableChat