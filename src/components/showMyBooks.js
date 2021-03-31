import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/layout";
import { Table } from "@chakra-ui/table";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
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
  const errorMessage = () => {
    toast.closeAll();
    toast({
      position: "top",
      title: "Error",
      description: "Please check the console for errors",
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
  };
  return (
    <div>
      {error && errorMessage()}
      {message && successMessage()}
      <SimpleGrid minChildWidth="320px" spacing="24px">
        {books.map((book) => {
          if (book.owner === account) {
            return (
              <Box textAlign="center">
                <BookCard
                  title={book.title}
                  image={book.image}
                  author={book.author}
                  isbn={book.isbn}
                  price={book.price}
                  category={book.category}
                ></BookCard>
                {!book.forSale && (
                  <Button
                    isLoading={loading}
                    mt="20px"
                    onClick={() => markForSale(book.id)}
                  >
                    Mark This Book For Sale
                  </Button>
                )}
              </Box>
            );
          }
        })}
      </SimpleGrid>
    </div>
  );
}
