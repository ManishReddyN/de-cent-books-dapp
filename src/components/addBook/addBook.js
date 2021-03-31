import React from "react";
import { Heading } from "@chakra-ui/layout";
import { useState } from "react";
import FileInputComponent from "react-file-input-previews-base64";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Container } from "@chakra-ui/layout";
const imgbbUploader = require("imgbbjs");

function AddBook() {
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

  const imgbb = new imgbbUploader({ key: "bf1141f91ad93b052f5e3a36fa16ef9d" });
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const createBookForm = () => {
    return (
      <Box textAlign="center" padding="30px">
        <Heading size="md">Add Book</Heading>
        <Container maxW="xl">
          <FileInputComponent
            labelText="Upload the book cover"
            labelStyle={{ fontSize: 14 }}
            multiple={true}
            callbackFunction={(file_arr) => {
              imgbb
                .upload(file_arr[0].base64.split(",")[1])
                .then((res) => {
                  console.log(res.data.image.url);
                  setValues({ ...values, img_url: res.data.image.url });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            imagePreview={true}
            accept="image/*"
          />
          <FormControl id="name" isRequired>
            <FormLabel>Name of the Book</FormLabel>
            <Input type="string" onChange={handleChange("name")} />
          </FormControl>
        </Container>
      </Box>
    );
  };

  return <div>{createBookForm()}</div>;
}

export default AddBook;
