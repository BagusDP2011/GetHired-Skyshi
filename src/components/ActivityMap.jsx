import {
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

const ActivityMap = ({ id, title, created_at,editBtnHandler, deleteBtnHandler }) => {
  return (
    <>
      <Box>
        <Box
          width="250px"
          height="250px"
          border="1px solid black"
          m="10px"
          borderRadius="20px"
        >
          <Text fontSize="26px" fontWeight="bold">
            {title}
          </Text>
          <Box paddingTop="80px" />
          <Text fontSize="20px" fontWeight="light">
            {moment(created_at).format('DD MMMM YYYY')}
          </Text>
          <HStack justify="center" mt="20px">
            <Link to={`/activity/${id}`}>
          <Button 
          colorScheme="orange"
          cursor="pointer"
          fontWeight="bold"
          borderRadius="5px"
          onClick={editBtnHandler}
           >Edit</Button>
           </Link>
          <Button 
          backgroundColor="red"
          cursor="pointer"
          fontWeight="bold"
          borderRadius="5px"
          onClick={deleteBtnHandler}
           >Delete</Button>
           </HStack>
        </Box>
      </Box>
    </>
  );
};

export default ActivityMap;
