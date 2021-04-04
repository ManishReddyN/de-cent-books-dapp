import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Tag,
} from "@chakra-ui/react";

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
        px={6}
        pt={6}
        maxW={"320px"}
        w={"full"}
        bg={"blackAlpha.400"}
        boxShadow={"xl"}
        roundedTop={"lg"}
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
              {price} GWEI
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default BookCard;
