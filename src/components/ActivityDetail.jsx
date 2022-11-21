import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Stack,
  Table,
  Tbody,
  Text,
  Tr,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PageItem from "../assets/TodoItems.jpg";
import { axiosInstance } from "../api";
import { useFormik } from "formik"
import * as Yup from "yup"
import ItemDetail from "./ItemDetail";

const ActivityDetail = () => {
  const [dataItems, setDataItems] = useState([]);
  const [openedEdit, setOpenedEdit] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const toast = useToast();


  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get(`/todo-items`);
      // console.log(response.data.data);
      setDataItems(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/activity-groups/${id}`)
      fetchItems()
      toast({ title: "Successfully deleted activity", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }

  const renderItems = () => {
    return dataItems.map((val) => {
      return (
        <ItemDetail
          key={val.id.toString()}
          id={val.id}
          title={val.title}
          priority={val.priority}
          deleteBtnHandler={() => deleteBtnHandler(val.id)}
        />
      );
    });
  };

  const addItems = async () => {
    try {
      let activityData = {
        title: "New Items",
      };

      await axiosInstance.post(`/activity-groups`, activityData);
      fetchItems();
      toast({ title: "Successfully added activity", status: "success" });
    } catch (err) {
      console.log(err);
    }
  };

  const editTitleFormik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (values) => {
      try {
        let editedTitle = {
          title: values.title,
        };

        await axiosInstance.patch(
          `/activity-groups/:id`,
          editedTitle
        );

        toast({ title: "Title edited", status: "success" });
        editTitleFormik.setFieldValue("title", "");
        fetchItems();
        setOpenedEdit(null);
      } catch (err) {
        console.log(err);
        toast({ title: "Server error while editing", status: "error" });
      }
    },
    validationSchema: Yup.object({
      nama_warehouse: Yup.string().required(),
      address: Yup.string().required(),
      // UserId: Yup.number().required(),
    }),
    validateOnChange: false,
  });

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target;
    editTitleFormik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Box width="80%">
        <HStack justifyContent="space-between" ml="100px" mt="100px" mb="50px">
          <Text fontSize="25px" fontWeight="bold">
            Activity
          </Text>
          {!editTitle ? (
          <Button onClick={() => setOpenedEdit(true)}>Edit title</Button>
          ) : (
            <Box>
            <FormControl isInvalid={editTitleFormik.errors.title} />
                <FormLabel>Title</FormLabel>
                <Input
                  value={editTitleFormik.values.title}
                  placeholder={"Input title"}
                  name="title"
                  onChange={editFormChangeHandler}
                  width="80%"
                  border="1px solid black"
                />
                <FormErrorMessage>
                  {editTitleFormik.errors.title}
                </FormErrorMessage>
                <Button colorScheme="red" onClick={setEditTitle(false)}>Cancel</Button>
                <Button colorScheme="green" type="submit" onClick={editTitleFormik.handleSubmit}>Save</Button>
                </Box>
          )}
          <Button
            colorScheme="blue"
            bgColor="#16ABF8"
            borderRadius="20px"
            fontSize="20px"
            borderColor="#16ABF8"
            cursor="pointer"
            color="white"
            p="10px"
            onClick={() => addItems()}
          >
            + Tambah
          </Button>
        </HStack>
        {/* <div data-cy="item-empty-state" className="item-empty-state" /> */}
        {dataItems.length === 0 ? (
          <Stack alignItems="center">
            <Image
              src={PageItem}
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
          {/* <div data-cy="item-list" className="item-list" /> */}
            <Table>
              <Tbody>
                <Tr>{renderItems()}</Tr>
              </Tbody>
            </Table>
          </Container>
        )}
        {/* Modal Activity */}
        <Modal isOpen={openedEdit} onClose={() => setOpenedEdit(null)}>
          <ModalContent>
            <ModalHeader>Edit Activity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={editTitleFormik.errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  type={"text"}
                  onChange={editFormChangeHandler}
                  value={editTitleFormik.values.title}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => setOpenedEdit(null)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => editTitleFormik.handleSubmit}
                type="submit"
              >
                Edit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ActivityDetail;
