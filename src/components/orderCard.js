import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Description } from "./description";

export function OrderCard({
  buyer,
  name,
  address,
  zipCode,
  orderId,
  phone,
  state,
  bookName,
}) {
  return (
    <Box as="section" bg={mode("gray.100", "inherit")} py="12">
      <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ md: "8" }}>
        <Box
          maxW="3xl"
          mx="auto"
          rounded={{ md: "lg" }}
          bg={mode("white", "gray.700")}
          shadow="base"
          overflow="hidden"
          padding="20px"
        >
          <Flex align="center" justify="space-between" px="6" py="4">
            <Text as="h3" fontWeight="bold" fontSize="lg">
              Order Info
            </Text>
            <Button
              variant="outline"
              colorScheme="blue"
              minW="20"
              leftIcon={<CheckCircleIcon />}
            >
              Mark As Delivered
            </Button>
          </Flex>
          <Divider />
          <Box>
            <Description title="Name" value={name} />
            <Description title="Address" value={address + " ZIP: " + zipCode} />
            <Description title="Phone Number" value={phone} />
            <Description title="Order ID" value={orderId} />
            <Description title="Book Details" value={bookName} />
            <Description title="Status" value={state} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
