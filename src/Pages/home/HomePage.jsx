import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";
import "./home.scss";
function HomePage() {
  return (
    <Container max="xl" centerContent>
      <Box className="auth_area_header">
        <Text className="header_text">Lets Chat</Text>
      </Box>
      <Box className="auth_area_input_section" >
        <Tabs variant="soft-rounded" >
          <TabList>
            <Tab className="auth_tab" >Login</Tab>
            <Tab  className="auth_tab" >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
