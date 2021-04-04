import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormErrorIcon } from "@chakra-ui/form-control";
import { Box, Center, SimpleGrid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import Base from "./base";
import BookCard from "./bookCard";
import Fuse from "fuse.js";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { SearchIcon } from "@chakra-ui/icons";
export default function ViewBooksForSale() {
  const toast = useToast();
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [booksForSale, setBooksForSale] = useState([]);
  const [booksForSaleData, setBooksForSaleData] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);
  const [fuseComp, setFuseComp] = useState();
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(0);
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
    const booksList = await bookStoreContract.methods
      .getBooksForSale(20)
      .call();
    console.log(booksList);
    const l = booksList.length;
    let booksToDisplay = [];
    for (let i = 0; i < l; i++) {
      const book = await bookStoreContract.methods.getBook(booksList[i]).call();
      if (
        book.owner !== account &&
        book.id !==
          "0x0000000000000000000000000000000000000000000000000000000000000000" &&
        book.forSale
      ) {
        booksToDisplay.push(book);
      }
    }
    const fuse = new Fuse(booksToDisplay, { keys: ["title", "author"] });
    setFuseComp(fuse);
    setBooksForSale(booksToDisplay);
    setBooksForSaleData(booksToDisplay);
    console.log(booksToDisplay);
    setLoading(false);
    setBooksLoaded(true);
  }

  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksLoaded]);

  const searchData = (pattern) => {
    if (!pattern) {
      setBooksForSaleData(booksForSale);
      return;
    }
    const results = fuseComp.search(pattern);
    console.log(results);
    const matches = [];
    if (results.length === 0) {
      setBooksForSaleData([]);
    } else {
      results.forEach((item) => {
        matches.push(item.item);
      });
      setBooksForSaleData(matches);
    }
  };
  return (
    <Base>
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
      <div>
        {booksForSale.length === 0 && !loading && (
          <Center minH="85vh" padding="20px">
            <Alert status="error" maxW="xl">
              <AlertIcon>
                <FormErrorIcon />
              </AlertIcon>
              <AlertTitle>No Books Found</AlertTitle> Sorry We Couldn't Find Any
              Books For Sale Now!
            </Alert>
          </Center>
        )}
        {booksForSale.length > 0 && (
          <Box>
            <Center padding="10px">
              <Box maxW="2xl" textAlign="center">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                  />
                  <Input
                    variant="filled"
                    placeholder="Search for books and authors"
                    onChange={(e) => searchData(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </Center>
            <SimpleGrid minChildWidth="320px" spacing="24px">
              {booksForSaleData.map((book) => {
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
                    <Link to={`/buyBook?id=${book.id}&price=${book.price}`}>
                      <Button width="320px" colorScheme="blue" roundedTop={0}>
                        Buy This Book
                      </Button>
                    </Link>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}
      </div>
    </Base>
  );
}
