import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import "./login.scss";
import EmailValidator from "email-validator";
import axios from "../../../Constant/Axios";
import { ChatContext } from "../../../Context/ChatPrivider";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {setUser}=useContext(ChatContext)
 
  const navigate=useNavigate()
  const manageSubmit = async () => {
    setLoading(true);
    if (!EmailValidator.validate(email)) {
      toast({
        title: "Pleas Enter Valid Email Address",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else if (password.length < 8) {
      toast({
        title: "Password needed minimum 8 leters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else {
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.error) {
        toast({
          title: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }else{
        localStorage.setItem('userInfo',JSON.stringify(data))
        setUser(data)
        setLoading(false)
        navigate('/chat')
      }
    }
  };
  return (
    <div className="login_input_area">
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
      </FormControl>
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

      <Button
        isLoading={loading}
        variant={"solid"}
        onClick={manageSubmit}
        colorScheme="blue"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
