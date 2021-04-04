import React from "react";
import { Center, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import FileInputComponent from "react-file-input-previews-base64";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Container } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import { Select, useToast } from "@chakra-ui/react";
import Web3 from "web3";
import { Redirect, useHistory } from "react-router";
import Base from "./base";
const imgbbUploader = require("imgbbjs");

function AddBook() {
  const toast = useToast();
  const [values, setValues] = useState({
    title: "",
    isbn: "",
    author: "",
    category: "",
    price: 0,
    forSale: false,
    img_url: "",
  });
  const { title, isbn, author, category, price, forSale, img_url } = values;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const imgbb = new imgbbUploader({ key: "bf1141f91ad93b052f5e3a36fa16ef9d" });
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [name]: value,
    });
    setError("");
    setMessage("");
    setLoading(false);
  };
  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    if (accounts[0] === undefined) {
      window.location = "/";
    }
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setBookStore(bookStoreContract);
  }
  useEffect(() => {
    loadBlockchainData();
  }, []);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    console.log(title);
    if (
      title === "" ||
      isbn === "" ||
      author === "" ||
      category === "" ||
      price === 0 ||
      img_url === ""
    ) {
      setError(true);
      setLoading(false);
    }
    try {
      await bookStore.methods
        .addBook(
          title,
          isbn,
          author,
          category,
          price * 1000000000,
          false,
          img_url
        )
        .send({ from: account })
        .once("receipt", (receipt) => {
          console.log(receipt);
          setLoading(false);
          setMessage(true);
        });
    } catch (err) {
      setLoading(false);
      setError(false);
      console.log(err);
    }
    setValues({
      ...values,
      title: "",
      isbn: "",
      author: "",
      category: "",
      price: 0,
      forSale: false,
      img_url: "",
    });
  };
  const history = useHistory();
  const errorMessage = () => {
    toast.closeAll();
    toast({
      position: "top",
      title: "Error",
      description:
        "Please fill all the fields, also check if the book already exists",
      isClosable: true,
      status: "error",
    });
  };
  const successMessage = () => {
    toast.closeAll();
    toast({
      position: "top",
      title: "Success",
      isClosable: true,
      description: "Transaction Successful Through Metamask",
      status: "success",
    });
    history.push("/myBooks");
  };

  const createBookForm = () => {
    return (
      <Base>
        <div>
          <Box textAlign="center" padding="30px" color="white">
            <Heading size="md">Add Book</Heading>
            <Container maxW="2xl">
              <FormControl isRequired marginTop="20px">
                <FormLabel>Cover of the Book</FormLabel>
                <Center>
                  <FileInputComponent
                    labelText=""
                    labelStyle={{ fontSize: 14 }}
                    multiple={false}
                    buttonComponent={
                      <button type="button">
                        <Box
                          maxW="sm"
                          border="1px"
                          padding="10px"
                          borderRadius="20px"
                        >
                          <Text>Upload the book cover</Text>
                          <AttachmentIcon w={10} h={10} />
                        </Box>
                      </button>
                    }
                    callbackFunction={(file_arr) => {
                      imgbb
                        .upload(file_arr.base64.split(",")[1])
                        .then((res) => {
                          setValues({ ...values, img_url: res.data.image.url });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    imagePreview={true}
                    accept="image/*"
                  />
                </Center>
              </FormControl>

              <FormControl id="title" isRequired marginTop="20px">
                <FormLabel>Name of the Book</FormLabel>
                <Input
                  variant="filled"
                  type="string"
                  onChange={handleChange("title")}
                />
              </FormControl>
              <FormControl id="name" isRequired marginTop="20px">
                <FormLabel>Author of the Book</FormLabel>
                <Input
                  variant="filled"
                  type="string"
                  onChange={handleChange("author")}
                />
              </FormControl>
              <FormControl id="name" isRequired marginTop="20px">
                <FormLabel>ISBN Number of the Book</FormLabel>
                <Input
                  variant="filled"
                  type="string"
                  onChange={handleChange("isbn")}
                />
              </FormControl>
              <FormControl id="name" isRequired marginTop="20px">
                <FormLabel>Genre</FormLabel>
                <Select
                  placeholder="Select Genre"
                  onChange={handleChange("category")}
                  variant="filled"
                >
                  <option value="Science & Technology">
                    Science & Technology
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Others">Others</option>
                </Select>
              </FormControl>
              <FormControl id="name" isRequired marginTop="20px">
                <FormLabel>Price of the Book (In GWEI)</FormLabel>
                <Input
                  variant="filled"
                  type="number"
                  onChange={handleChange("price")}
                />
              </FormControl>
              <Button
                isLoading={loading}
                colorScheme="blue"
                marginTop="20px"
                onClick={submit}
                size="lg"
              >
                Add Book
              </Button>
            </Container>
          </Box>
        </div>
      </Base>
    );
  };

  return (
    <div>
      {createBookForm()}
      {message !== "" && successMessage()}
      {error !== "" && errorMessage()}
    </div>
  );
}

export default AddBook;
