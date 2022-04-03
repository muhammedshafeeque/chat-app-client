import { Menu, MenuButton, MenuItem, MenuList, Text,Button } from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons' 
import React,{useContext} from "react";
import {ChatContext} from "../../../Context/ChatPrivider";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../Drawer/SideDrawer";

function Header() {
  const {user,setUser}=useContext(ChatContext)
  const navigate=useNavigate()
  return (
    <div className="header">
     <SideDrawer/>
      <Text className="Header_text">Lets Chat</Text>
      <div className="profile_area">
      
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
