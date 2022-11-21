import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Page1 from "../assets/GetHired.jpg";
import { axiosInstance } from "../api";
import ActivityMap from "./ActivityMap";

const Homepage = () => {
  const [data, setData] = useState([]);
  const toast = useToast()

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/activity-groups`);
      // console.log(response.data.data);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderActivity = () => {
    return data.map((val) => {
      return (
        <ActivityMap
          key={val.id.toString()}
          id={val.id}
          title={val.title}
          created_at={val.created_at}
          deleteBtnHandler={() => deleteBtnHandler(val.id)}
        />
      );
    });
  };
  
  const addActivity = async () => {
    try {
      let activityData = {
        title: "New Activity",
      }

      await axiosInstance.post(`/activity-groups`, activityData)
      fetchData()
      toast({ title: "Successfully added activity", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }
  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/activity-groups/${id}`)
      fetchData()
      toast({ title: "Successfully deleted activity", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div data-cy="activity-empty-state" className="activity-empty-state">
      <Box width="80%">
        <HStack justifyContent="space-between" ml="100px" mt="100px" mb="50px">
          <Text fontSize="25px" fontWeight="bold">
            Activity
          </Text>
          <Button
            colorScheme="blue"
            bgColor="#16ABF8"
            borderRadius="20px"
            fontSize="20px"
            borderColor="#16ABF8"
            cursor="pointer"
            color="white"
            p="10px"
            onClick={() => addActivity()}
          >
            + Tambah
          </Button>
        </HStack>
        {data.length === 0 ? (
          <Stack alignItems="center">
            <Image
              src={Page1}
              alt="Add new task"
              width="600px"
              height="500px"
            />
          </Stack>
        ) : (
          <Container 
          display="grid" 
          gridTemplateColumns="1fr 1fr 1fr 1fr" 
          textAlign="center"
          ml="50px"
          >
          {/* <div data-cy="activity-dashboard" className="dashboard" /> */}
          {renderActivity()}
          </Container>
        )}
      </Box>
    </div>
  );
};

export default Homepage;
