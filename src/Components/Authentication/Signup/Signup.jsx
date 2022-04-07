import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import "./signup.scss";
import axios from '../../../Constant/Axios'
import { Store } from "../../../Context/ChatPrivider";
import { useNavigate } from "react-router-dom";
import EmailValidator from 'email-validator'
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {setUser}=Store()
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const toast = useToast();
  const [userName,setUserName]=useState()
  const [userNameMessage,setUserNameMessage]=useState(null)
  const manageUsername=async(e)=>{
    e.preventDefault()
    
    if(e.target.value.length<3){
      setUserNameMessage('user Name must be minimum 3 leters')
    }else{
     let {data}= await  axios.get(`/api/user/check-username/${e.target.value}`)
     if(data.error){
       setUserNameMessage(data.error)
     }else{
       setUserName(e.target.value)
       setUserNameMessage(null)
     }
    }
  }
  const manageSubmit = async() => {
    setLoading(true);
    if (!email || !name || !password||!userName) {
      toast({
        title: "All fields must be  required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom'
      });
      setLoading(false)
    }else if(password.length<8){
      toast({
        title: "Password needed minimum 8 leters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:'bottom'
      });
      setLoading(false)
    }else if(!EmailValidator.validate(email)){
      toast({
        title: "Pleas Enter Valid Email Address",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:'bottom'
      });  
      setLoading(false)
    }else{
      try {
        const {data}= await axios.post('/api/user/signup',{name,email,password,userName})
        if(data.error){
          toast({
            title: data.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position:'bottom'
          });
          setLoading(false)
        }else{
          localStorage.setItem('userInfo',JSON.stringify(data))
          setUser(data)
          setLoading(false)
          navigate('/chat')
        }
        
      } catch (error) {
        
      }

    

    }
  };

  return (
    <div className="signup_input_area">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
          placeholder="Enter Your name "
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>User Name</FormLabel>
        <Input
          type="text"
          onChange={manageUsername}
          placeholder="Choos a User Name "
        />
      </FormControl>
      {userNameMessage&&<p className="usernamemessage">{userNameMessage}</p>}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
          type={"email"}
          placeholder="Enter Your Email "
        />
      </FormControl >
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type={"Password"}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          placeholder="Enter Your Password "
        />
      </FormControl>

      <Button isLoading={loading} variant={"solid"} onClick={manageSubmit} colorScheme="blue">
        Submit
      </Button>
    </div>
  );
}

export default Signup;
