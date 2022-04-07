import { Menu, MenuButton, MenuItem, MenuList, Text,Button, Badge } from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons' 
import React from "react";
import { Store } from "../../../Context/ChatPrivider";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../Drawer/SideDrawer";
import {BsBellFill} from 'react-icons/bs'
import { getSender } from "../../../Config/ChatLogic";

function Header() {
  const { user ,setUser,notification,setSelectedChat} = Store();
  const navigate=useNavigate()
  return (
    <div className="header">
     <SideDrawer/>
      <Text className="Header_text">Lets Chat</Text>
      <div className="profile_area">
        <Menu>
          <MenuButton>
          <Badge ml={'10px'} borderRadius='5px' color={'white'}  bg="red">{notification.length?notification.length:'0'}</Badge>
          <BsBellFill/>
          </MenuButton>
          <MenuList>
          {notification.length ? <>
            {notification.map((msg)=>{
              return  <MenuItem key={msg._id } onClick={(e)=>{
                e.preventDefault()
                setSelectedChat(msg.chat)
              }} >{`new Message from ${getSender(user,msg.chat.users)}`}</MenuItem>
            })}
          </>:<MenuItem>No new Notifiations</MenuItem>}
          </MenuList>
            
        </Menu>
       
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user&&<p>{user.name}</p>}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={()=>{
              localStorage.removeItem('userInfo')
              setUser('')
              navigate('/')

            }}>Logout</MenuItem>
           
           
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
