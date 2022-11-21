import "./App.css";
import { Box, HStack, Text } from "@chakra-ui/react";
import Homepage from "./components/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import ActivityDetail from "./components/ActivityDetail";

function App() {
  return (
    <>
      <Box bgColor={"#16ABF8"} width="100%" position="absolute" height="100px">
        <HStack justifyContent="space-between" height="100px">
          <Box>
            <Text
              fontSize="30px"
              color="white"
              fontWeight="bold"
              ml="100px"
              mt="100px"
              mb="100px"
            >
              TO DO LIST APP
            </Text>
          </Box>
          <Box color="white" paddingRight="40px">
            <Text>Made by: Bagus Dwi Putra</Text>
            <a href="https://www.linkedin.com/in/bagus-dwi-putra/">
              Linkedin: Bagus Dwi Putra
            </a><br/>
            <a href="http://wa.me/+6281278732817">
              WhatsApp: 081278732817
            </a>
          </Box>
        </HStack>
        {/* <Homepage /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/Homepage" replace />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
