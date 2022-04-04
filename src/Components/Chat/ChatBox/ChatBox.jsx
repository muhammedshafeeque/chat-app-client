import { Box, FormControl, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./chatbox.scss";
import { Store } from "../../../Context/ChatPrivider";
import { getSender } from "../../../Config/ChatLogic";
import axios from "../../../Constant/Axios";
import ScrollableChat from "../../Miscellaneous/ScrollableChat/ScrollableChat";
function ChatBox() {
  const { selectedChat, user } = Store();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  const fetchMessages = async () => {
    
    if (selectedChat) {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const { data } = await axios.get(
          `/api/message/fetch-messages/${selectedChat._id}`,
          config
        );
        
        if (!data.error) {
          setMessages(data);
        }else{
          toast({
            title: "message fetching faild",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } catch (error) {
        toast({
          title: "message fetching faild",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const manageSendMessage = async () => {
    if (!newMessage) {
      toast({
        title: "Pleas enter a message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {  
     
        let message = {
          sender:user.id, 
          content: newMessage,
          chatId:selectedChat._id,
        };
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post("/api/message/send", message, config);
        if (!data.error) {
          setMessages([data, ...messages]);
          setNewMessage("");
        } else {
          toast({
            title: "Message sending failed",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        toast({
          title: "Message sending failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <Box className="chatBox">
      {selectedChat ? (
        <Box>
          <Text className="header_text">
            {getSender(user, selectedChat.users).toUpperCase()}
          </Text>
          <Box className="chat_area">
            <div className="messages">
              <ScrollableChat messages={messages} />
            </div>
            <FormControl
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  manageSendMessage();
                }
              }}
              isRequired
              mt={3}
            >
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default ChatBox;
