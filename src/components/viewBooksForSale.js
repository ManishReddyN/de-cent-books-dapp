import { Button } from "@chakra-ui/button";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import BookCard from "./bookCard";

export default function ViewBooksForSale() {
  const toast = useToast();
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [booksForSale, setBooksForSale] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);
  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setBookStore(bookStoreContract);
    const booksList = await bookStoreContract.methods
      .getBooksForSale(20)
      .call();
    console.log(booksList);
    const l = booksList.length;
    let booksToDisplay = [];
    for (let i = 0; i < l; i++) {
      booksToDisplay.push(
        await bookStoreContract.methods.getBook(booksList[i]).call()
      );
    }
    setBooksForSale(booksToDisplay);
    console.log(booksToDisplay);
    setBooksLoaded(true);
  }
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
  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksLoaded]);

  return (
    <div>
      <SimpleGrid minChildWidth="320px" spacing="24px">
        {booksForSale.map((book) => {
          if (
            book.owner !== account &&
            book.id !==
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ) {
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
                {book.forSale && <Button mt="20px">Buy This Book</Button>}
              </Box>
            );
          }
        })}
      </SimpleGrid>
    </div>
  );
}
