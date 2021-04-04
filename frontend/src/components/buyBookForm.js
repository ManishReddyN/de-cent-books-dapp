import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Container, Heading, SimpleGrid } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import Base from "./base";
import BookCard from "./bookCard";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function BuyBookForm() {
  let query = useQuery();
  let id = query.get("id");
  let price = query.get("price");
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
  const [values, setValues] = useState({
    name: "",
    address: "",
    zipCode: "",
    phone: "",
  });
  const { name, address, phone, zipCode } = values;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [booksLoaded, setBooksLoaded] = useState(false);
  const [book, setBook] = useState();
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
    setLoading(true);
    let book1 = await bookStoreContract.methods.getBook(id).call();
    setBook(book1);
    console.log(book);
    setBooksLoaded(true);
    setLoading(false);
  }

  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  const buyNow = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await bookStore.methods
        .buyBook(book.id, name, address, zipCode, phone)
        .send({ from: account, value: book.price })
        .once("receipt", (receipt) => {
          console.log(receipt);
          setLoading(false);
          setMessage(true);
          routeChange("/orders");
        });
    } catch {}
  };

  return (
    <Base>
      <div>
        {book && !book.forSale && <Redirect to="/" />}
        {book && book.owner !== account && (
          <SimpleGrid minChildWidth="320px" spacing="30px">
            <Box>
              {book && (
                <BookCard
                  title={book.title}
                  author={book.author}
                  price={book.price / 1000000000}
                  isbn={book.isbn}
                  image={book.image}
                  category={book.category}
                />
              )}
            </Box>
            <Box textAlign="center" padding="30px" color="white">
              <Heading size="md">Buy Book</Heading>
              <Container maxW="2xl">
                <FormControl id="title" isRequired marginTop="20px">
                  <FormLabel>Your Name</FormLabel>
                  <Input type="string" onChange={handleChange("name")} />
                </FormControl>
                <FormControl id="name" isRequired marginTop="20px">
                  <FormLabel>Your Delivery Address</FormLabel>
                  <Input type="string" onChange={handleChange("address")} />
                </FormControl>
                <FormControl id="name" isRequired marginTop="20px">
                  <FormLabel>Postal Code</FormLabel>
                  <Input type="number" onChange={handleChange("zipCode")} />
                </FormControl>
                <FormControl id="name" isRequired marginTop="20px">
                  <FormLabel>Mobile Number</FormLabel>
                  <Input type="number" onChange={handleChange("phone")} />
                </FormControl>
                <Button
                  isLoading={loading}
                  colorScheme="blue"
                  marginTop="20px"
                  onClick={buyNow}
                  size="lg"
                >
                  Buy Now
                </Button>
              </Container>
            </Box>
          </SimpleGrid>
        )}
        {book && book.owner === account && (
          <Center>
            <Box maxW="2xl">
              <Alert>Sorry! You Own This Book. You can not buy it again</Alert>
            </Box>
          </Center>
        )}
      </div>
    </Base>
  );
}

export default BuyBookForm;
