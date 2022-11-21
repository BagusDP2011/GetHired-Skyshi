import { Box, Button, Td, Text } from "@chakra-ui/react";


const ItemDetail = ({
  id,
  title,
  priority,
  deleteBtnHandler,
}) => {
  return (
    <>
    <Box justifyContent="space-between" width="1400px">
          <Td>{priority}</Td>
          <Td>
            <Text fontSize="26px" fontWeight="bold">
              {title}
            </Text>
          </Td>
          <Td>
            <Button
              backgroundColor="red"
              cursor="pointer"
              fontWeight="bold"
              borderRadius="5px"
              onClick={deleteBtnHandler}
            >
              Delete
            </Button>
          </Td>
          </Box>
    </>
  );
};

export default ItemDetail;
