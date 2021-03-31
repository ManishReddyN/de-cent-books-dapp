import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { Book_Store_ABI, Book_Store_Address } from "./config";
import Web3 from "web3";
import { useToast } from "@chakra-ui/react";
import "./App.css";

function CheckMetamask() {
  const toast = useToast();
  const { status, connect, account } = useMetaMask();

  function closeAll() {
    toast.closeAll();
  }
  if (status === "unavailable") {
    closeAll();
    toast({
      position: "top",
      title: "Metamask is not available",
      description:
        "You need metamask to use this site. Install it at https://metamask.io",
      isClosable: false,
      status: "error",
    });
  }
  if (status === "initializing") {
    closeAll();
    toast({
      position: "top",
      title: `Synchronization with Metamask is Ongoing...`,
      isClosable: true,
      status: "info",
      duration: 3000,
    });
  }

  if (status === "notConnected") {
    closeAll();
    toast({
      position: "top",
      title: `Connect With Metamask To Continue`,
      status: "error",
      duration: 7000,
    });
    return (
      <Box minW="100%" textAlign="center" marginTop="60px">
        <Button colorScheme="linkedin" onClick={connect}>
          Connect to MetaMask
        </Button>
      </Box>
    );
  }

  if (status === "connecting") {
    closeAll();
    toast({
      position: "top",
      title: `Metamask is Connecting...`,
      isClosable: true,
      status: "info",
      duration: 3000,
    });
  }

  if (status === "connected") {
    closeAll();
    toast({
      position: "top",
      title: `Metamask Connected 😀`,
      description: `Account: ${account}`,
      isClosable: true,
      status: "success",
      duration: 3000,
    });
  }

  return null;
}
function App() {
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  // const [booksForSale, setBooksForSale] = useState();
  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setBookStore(bookStoreContract);
    // const booksForSaleList = await bookStoreContract.methods
    //   .getBooksForSale(5)
    //   .call();
    // setBooksForSale(booksForSaleList);
  }
  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {CheckMetamask()}
      <Heading padding="20px">Hello User</Heading>
      <Heading size="sm">Your Account Address is: {account}</Heading>
      <Link href="/addBook">Add Books</Link>
      <br />
      <Link href="/viewBooks">View Books For Sale</Link>
      <br />
      <Link href="/myBooks">View My Books</Link>
    </Box>
  );
}

export default App;
