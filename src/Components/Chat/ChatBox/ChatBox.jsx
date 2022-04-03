import { Box, FormControl, Input, Text } from '@chakra-ui/react'
import React from 'react'
import './chatbox.scss'
import {Store} from '../../../Context/ChatPrivider'
import { getSender } from '../../../Config/ChatLogic'
function ChatBox() {
  const {selectedChat, user}=Store()
  return (
    <Box className='chatBox'>
      {selectedChat?<Box>
        
        <Text className='header_text' >{getSender(user,selectedChat.users).toUpperCase()}</Text>
        <Box className='chat_area'>
        <div className="messages">

        </div>
        <FormControl   isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Enter a message.."
                
                
              />
            </FormControl>
        </Box>
      </Box>:''}
    </Box>
  )
}

export default ChatBox