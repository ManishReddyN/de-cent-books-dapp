import { Button } from "@chakra-ui/button";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";
import Base from "./base";
import { Description } from "./description";

function ViewBuyingOrders() {
  const toast = useToast();
  const [account, setAccount] = useState(undefined);
  const [bookStore, setBookStore] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [orders, setOrders] = useState([]);

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
    let ordersIdsList = [];
    let ordersList = [];
    try {
      console.log(await bookStoreContract.methods.getSentAddress().call());
      ordersIdsList = await bookStoreContract.methods.getOrdersLists().call();
      console.log(ordersIdsList);
      for (let i = 0; i < ordersIdsList.length; i++) {
        const ord = await bookStoreContract.methods
          .getOrderById(ordersIdsList[i])
          .call();
        ordersList.push(ord);
      }
      console.log(ordersList);
      setOrders(ordersList);
      setOrdersLoaded(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadBlockchainData();
  }, [ordersLoaded]);

  return (
    <Base>
      <Box textAlign="center">
        <Heading size="lg" marginTop="20px" color="#8ac5eb">
          Orders
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
      <SimpleGrid minChildWidth="xl" spacing="30px">
        {orders &&
          orders.map(
            (pOrder, index) =>
              account === pOrder.customer && (
                <Box as="section" py="12" borderColor="blue.900">
                  <Box
                    maxW={{ base: "xl", md: "xl" }}
                    mx="auto"
                    px={{ md: "8" }}
                  >
                    <Box
                      maxW="3xl"
                      mx="auto"
                      rounded={{ md: "lg" }}
                      shadow="base"
                      overflow="hidden"
                      padding="10px"
                    >
                      <Flex
                        align="center"
                        justify="space-between"
                        px="6"
                        py="4"
                      >
                        <Text as="h3" fontWeight="bold" fontSize="lg">
                          Order #{index + 1} Info
                        </Text>
                      </Flex>
                      <Divider />
                      <Box>
                        <Description title="Name" value={pOrder.name} />
                        <Description
                          title="Address"
                          value={
                            pOrder.deliveryAddress +
                            ", Postal Code: " +
                            pOrder.postalCode
                          }
                        />
                        <Description title="Phone" value={pOrder.phone} />
                        <Description
                          title="Book Details"
                          value={pOrder.bookName}
                        />
                        <Description title="Status" value={pOrder.state} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
          )}
      </SimpleGrid>
    </Base>
  );
}
export default ViewBuyingOrders;
