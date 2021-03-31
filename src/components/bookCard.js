import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Tag,
  Button,
} from "@chakra-ui/react";
import Web3 from "web3";
import { Book_Store_ABI, Book_Store_Address } from "../config";

const BookCard = ({
  title = "title",
  isbn,
  author,
  category,
  price,
  image,
  forSale = false,
  id,
}) => {
  return (
    <Center pt={12} pb={0}>
      <Box
        role={"group"}
        p={6}
        maxW={"320px"}
        w={"full"}
        bg={"blackAlpha.400"}
        boxShadow={"xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        textAlign="center"
      >
        <Box
          rounded={"lg"}
          mt={2}
          pos={"relative"}
          height={"420px"}
          textAlign="center"
        >
          <Image
            rounded={"md"}
            height={400}
            width={300}
            objectFit={"fill"}
            src={image}
          />
        </Box>
        <Stack pt={1} align={"center"}>
          <Tag color={"gray.200"} fontSize={"sm"} textTransform={"uppercase"}>
            {category}
          </Tag>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Author: {author}
          </Text>
          <Text color={"gray.500"} fontSize={"xs"} textTransform={"uppercase"}>
            ISBN: {isbn}
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {price}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default BookCard;
