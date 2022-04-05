import { Box, FormControl, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./chatbox.scss";
import { Store } from "../../../Context/ChatPrivider";
import { getSender } from "../../../Config/ChatLogic";
import axios, { baseUrl } from "../../../Constant/Axios";
import ScrollableChat from "../../Miscellaneous/ScrollableChat/ScrollableChat";
import io from "socket.io-client";
function ChatBox() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { selectedChat } = Store();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  var socket, selectedChatCompare;
  socket = io(baseUrl);
  const toast = useToast();
  selectedChatCompare = selectedChat;

  socket.emit("setup", user);
  socket.on("connection", () => {
    setSocketConnected(true);
  });
  socket.on("message recieved", ((data) => {
    console.log(messages);
    if (!selectedChatCompare || selectedChatCompare._id !== data.chat._id) {
    } else {
      
      setMessages([...messages, data]);
      setNewMessage("");
    }
  }));
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
        socket.emit("join chat", selectedChat._id);
        if (!data.error) {
          setMessages(data);
        } else {
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
          sender: user.id,
          content: newMessage,
          chatId: selectedChat._id,
          chat: selectedChat,
        };

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post("/api/message/send", message, config);

        if (!data.error) {
          setMessages([...messages, data]);
          socket.emit("new message", message);
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
            {messages.length > 0 ? (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            ) : (
              <p></p>
            )}

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
