import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import Base from "./base";
import BookCard from "./bookCard";

export default function ShowMyBooks() {
  const toast = useToast();
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [booksLoaded, setBooksLoaded] = useState(false);
  const [books, setBooks] = useState([]);

  async function loadBlockchainData() {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setBookStore(bookStoreContract);
    const booksList = await bookStoreContract.methods.getBooksIds(25).call();
    console.log(booksList);
    const l = booksList.length;
    let booksToDisplay = [];
    for (let i = 0; i < l; i++) {
      booksToDisplay.push(
        await bookStoreContract.methods.getBook(booksList[i]).call()
      );
    }
    setBooks(booksToDisplay);
    console.log(booksToDisplay);
    setLoading(false);
    setBooksLoaded(true);
  }

  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksLoaded]);

  const markForSale = async (id) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setLoading(true);
    setError(false);
    setMessage(false);
    try {
      await bookStoreContract.methods
        .sellBook(id)
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
    setBooksLoaded(false);
  };
  const markForNotSale = async (id) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setLoading(true);
    setError(false);
    setMessage(false);
    try {
      await bookStoreContract.methods
        .unSellBook(id)
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
    setBooksLoaded(false);
  };
  const errorMessage = () => {
    toast.closeAll();
    if (!toast.isActive("Error"))
      toast({
        id: "Error",
        position: "top",
        title: "Error",
        description: "Please check the console for errors",
        isClosable: true,
        status: "error",
      });
  };
  const successMessage = () => {
    toast.closeAll();
    if (!toast.isActive("suc"))
      toast({
        id: "suc",
        position: "top",
        title: "Success",
        isClosable: true,
        description: "Transaction Successful Through Metamask",
        status: "success",
      });
  };
  return (
    <Base>
      <div>
        <Box textAlign="center">
          <Heading size="lg" marginTop="20px" color="#8ac5eb">
            My Books
          </Heading>
        </Box>
        {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        <SimpleGrid minChildWidth="350px" spacing="24px">
          {books.map((book) => {
            if (book.owner === account) {
              return (
                <Box textAlign="center">
                  <BookCard
                    title={book.title}
                    image={book.image}
                    author={book.author}
                    isbn={book.isbn}
                    price={book.price / 1000000000}
                    category={book.category}
                  ></BookCard>
                  {!book.forSale && (
                    <Button
                      isLoading={loading}
                      width="320px"
                      colorScheme="blue"
                      roundedTop={0}
                      onClick={() => markForSale(book.id)}
                    >
                      Mark This Book For Sale
                    </Button>
                  )}
                  {book.forSale && (
                    <Button
                      isLoading={loading}
                      width="320px"
                      colorScheme="blue"
                      roundedTop={0}
                      onClick={() => markForNotSale(book.id)}
                    >
                      Mark This Book As Not For Sale
                    </Button>
                  )}
                </Box>
              );
            }
          })}
        </SimpleGrid>
      </div>
    </Base>
  );
}
