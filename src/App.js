import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import {
  Container,
  Stack,
  Flex,
  Image,
  Icon,
  Link,
  createIcon,
  IconProps,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { Book_Store_ABI, Book_Store_Address } from "./config";
import Web3 from "web3";
import { useToast } from "@chakra-ui/react";
import "./App.css";
import { LinkIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import Footer from "./components/footer";

let showed = false;
const domain = "http://localhost:3000";
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
      title: "Metamask is not available 😬",
      description:
        "You need metamask to use this site. Please install to continue",
      isClosable: false,
      status: "error",
    });
  } else if (status === "initializing") {
    closeAll();
    const id = "initializing";
    if (!toast.isActive(id))
      toast({
        id,
        position: "top",
        title: `Synchronization with Metamask is Ongoing... ⌛`,
        isClosable: true,
        status: "info",
        duration: 3000,
      });
  } else if (status === "notConnected") {
    closeAll();
    connect();
  } else if (status === "connecting") {
    const id = "connecting";
    // if (!toast.isActive(id))
    return (
      status === id && (
        <Center>
          <Alert textAlign="center" status="warning">
            <AlertIcon />
            <AlertTitle>
              Waiting for metamask to connect...{" "}
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            </AlertTitle>
            <AlertDescription>
              <Button
                onClick={() => {
                  window.location.reload(false);
                }}
              >
                Refresh
              </Button>{" "}
              once done.
            </AlertDescription>
          </Alert>
        </Center>
      )
    );
  } else if (status === "connected") {
    if (showed === false) {
      showed = true;
      toast({
        position: "top",
        title: `Metamask Connected 😀`,
        isClosable: true,
        description: `Account: ${account}`,
        status: "success",
        duration: 2000,
      });
    }
  }

  return null;
}

function CallToActionWithVideo() {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.600",
                zIndex: -1,
              }}
            >
              Buy & Sell,
            </Text>
            <br />
            <Text as={"span"} color={"blue.400"}>
              Everything Decentralized
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            De-Cent Books is a decentralized online book store that lets you buy
            and sell books safely, using crypto and even helps you record
            everything in one place. It needs Metamask to connect with the block
            chain so please install it.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"bold"}
              px={6}
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              onClick={() => {
                routeChange("/home");
              }}
            >
              Start Buying
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"bold"}
              px={6}
              leftIcon={<LinkIcon h={4} w={4} color={"gray.300"} />}
              onClick={() => {
                window.open("https://metamask.io/download.html", "_blank");
              }}
            >
              Install Metamask
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("blue.50", "blue.600")}
          />
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://i.ibb.co/hMwW77S/Bestseller-and-books-stand-on-wooden-bookshelf-Booklet-diary-volumes-with-colorful-paperback-lying-i.jpg"
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d:
    "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

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
    <Box minH="100%">
      {CheckMetamask()}
      {CallToActionWithVideo()}
      {Footer()}
      {/* <Heading padding="20px">Hello User</Heading>
      <Heading size="sm">Your Account Address is: {account}</Heading>
      <Link href="/addBook">Add Books</Link>
      <br />
      <Link href="/viewBooks">View Books For Sale</Link>
      <br />
      <Link href="/myBooks">View My Books</Link>
      <br />
      <Link href="/myBuyingOrders">View My Buying Orders</Link> */}
    </Box>
  );
}

export default App;
