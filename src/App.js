import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Heading, Link, Text } from "@chakra-ui/layout";
import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { Book_Store_ABI, Book_Store_Address } from "./config";
import Web3 from "web3";
import "./App.css";

function CheckMetamask() {
  const { status, connect, account } = useMetaMask();

  if (status === "unavailable")
    return (
      <Alert status="error">
        MetaMask not available. Install it at{" "}
        <Link paddingLeft="10px" href="https://metamask.io" isExternal={true}>
          Metamask
        </Link>
      </Alert>
    );

  if (status === "initializing")
    return (
      <Alert status="info">Synchronisation with MetaMask ongoing...</Alert>
    );

  if (status === "notConnected")
    return <Button onClick={connect}>Connect to MetaMask</Button>;

  if (status === "connecting")
    return <Alert status="info">Connecting...</Alert>;

  if (status === "connected")
    return <Alert>Connected account: {account}</Alert>;

  return null;
}
function App() {
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [booksForSale, setBooksForSale] = useState();
  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const bookStoreContract = new web3.eth.Contract(
      Book_Store_ABI,
      Book_Store_Address
    );
    setBookStore(bookStoreContract);
    const booksForSaleList = await bookStoreContract.methods
      .getBooksForSale(5)
      .call();
    setBooksForSale(booksForSaleList);
  }
  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {CheckMetamask()}
      <Heading padding="20px">Hello Block Chain</Heading>
      <Heading size="sm">Your Account Address is: {account}</Heading>
      <Text>{booksForSale}</Text>
    </div>
  );
}

export default App;
