import React, { useEffect } from "react";
import "./mychats.scss";
import { Box, Stack, Text } from "@chakra-ui/react";
import { Store } from "../../../Context/ChatPrivider";
import axios from "../../../Constant/Axios";
import { getSender } from "../../../Config/ChatLogic";
function MyChats() {
  const { chat, selectedChat, setChat, setSelectedChat } = Store();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const fetchChats = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    let { data } = await axios.get("/api/chat/fetch-chats", config);
    if (!data.error) {
      setChat(data);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <Box className="mychats">
      <Box className="header">
        <h3>My Chats</h3>
      </Box>
      <Box className="mychat_list_area">
        {chat ? (
          <Stack overflow={"scroll"}>
            {chat.map((Chat) => {
              return (
                <Box
                  key={Chat._id}
                  onClick={(e) => {
                    setSelectedChat(Chat);
                  }}
                  className={selectedChat === Chat ? "row_selected" : "row"}
                >
                  <Text>{getSender(user, Chat.users)}</Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
