import React, { useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import axios from "../../../Constant/Axios";
import {ChatContext} from "../../../Context/ChatPrivider";
import UserListItem from "../userListItem/UserListItem";
function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState();
  const [keword, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chat, setChat, setSelectedChat}=useContext(ChatContext)

  const manageSearch = async () => {
    setLoading(true);
    if (!keword) {
      toast({
        title: "Pleas Enter somthing in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/user/getusers?search=${keword}`,
          config
        );
        if (data.error) {
          toast({
            title: "Failed",
            description: data.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          setLoading(false);
        } else {
          setResult(data);
          setLoading(false);
        }
      } catch (error) {
        toast({
          title: "Failed",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        setLoading(false);
      }
    }
  };
  const accessChat = async (userId) => {
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/chat/access",
      { userId: userId },
      config
    );
   

    if (data.error) {
      toast({
        title: "Failed",
        description: data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
   if(chat){
    if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);
   }
   setSelectedChat(data);
   setLoading(false);
   onClose();
      
    }
  };
  return (
    <div>
      <Button variant={"ghost"} onClick={onOpen}>
        <BsSearch />
        <Text ml="8px">Search User</Text>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box d="flex">
              <Input
                onChange={(e) => {
                  setKeyWord(e.target.value);
                }}
                placeholder="Search by name or Email"
              />
              <Button ml="5px" onClick={manageSearch} colorScheme={"blue"}>
                Go
              </Button>
            </Box>
            {loading ? (
              <p>loading...</p>
            ) : (
              <>
                {result && (
                  <Box>
                    {result.map((u) => {
                      return (
                        <UserListItem
                          key={u._id}
                          data={u}
                          handleFunction={() => accessChat(u._id)}
                        />
                      );
                    })}
                  </Box>
                )}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideDrawer;
