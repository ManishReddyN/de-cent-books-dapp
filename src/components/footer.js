import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const Logo = (props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="30.000000pt"
      height="30.000000pt"
      viewBox="0 0 500.000000 500.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
        fill="#1a202c"
        stroke="none"
      >
        <path
          d="M1580 4267 c-53 -27 -47 20 -130 -1057 -27 -355 -62 -809 -77 -1010
-27 -360 -41 -421 -42 -188 -1 53 -5 99 -10 102 -4 3 -18 -29 -29 -72 -12 -42
-65 -214 -117 -382 -52 -167 -95 -314 -95 -326 0 -12 6 -26 13 -31 10 -9 182
-64 405 -131 53 -16 65 -23 80 -53 l17 -34 125 -6 c125 -5 125 -5 525 -127
220 -68 436 -132 480 -143 44 -11 131 -36 194 -55 63 -19 122 -32 132 -29 15
5 59 89 59 114 0 6 14 54 31 107 28 89 32 121 10 98 -5 -5 -28 -72 -51 -149
-23 -77 -44 -146 -46 -154 -2 -7 -10 -11 -17 -8 -6 2 -257 78 -557 167 -300
90 -549 167 -555 172 -6 6 26 8 80 5 81 -4 137 -19 540 -141 248 -75 456 -137
464 -139 20 -3 99 252 82 263 -25 15 -174 20 -783 26 l-617 7 -10 29 -10 28
417 1 c249 1 401 5 377 10 -22 4 -224 8 -450 9 -225 1 -430 5 -455 10 -25 5
-123 32 -217 62 -158 48 -173 55 -173 75 0 13 3 23 8 23 4 0 74 -20 156 -45
82 -25 151 -45 153 -45 1 0 3 14 3 30 0 25 -4 30 -24 30 -27 0 -48 25 -86 100
-20 37 -25 67 -30 175 -4 72 -6 131 -5 133 1 1 12 -24 25 -57 12 -33 28 -65
35 -71 14 -11 213 -27 1315 -105 355 -25 664 -47 687 -49 30 -3 46 1 57 13 11
12 21 96 40 351 28 369 100 1307 116 1520 5 74 12 196 15 270 4 74 12 205 19
290 15 181 10 200 -49 200 -28 0 -38 5 -47 24 -21 47 67 38 -1163 121 -363 24
-689 47 -725 50 -43 3 -73 1 -90 -8z m2029 -218 l32 -11 -5 -62 c-4 -33 -15
-187 -26 -341 -11 -154 -27 -368 -35 -475 -8 -107 -26 -350 -40 -540 -68 -936
-85 -1164 -89 -1168 -3 -2 -128 5 -278 17 -150 11 -577 43 -948 71 -371 28
-693 53 -716 56 -39 4 -42 8 -74 74 -19 38 -32 71 -29 73 2 2 446 -28 986 -67
540 -38 985 -67 988 -64 8 8 52 568 150 1913 34 462 41 535 49 535 2 0 17 -5
35 -11z"
        />
        <path
          d="M3578 1406 c-12 -74 -9 -327 3 -297 5 13 8 96 7 185 -2 117 -5 148
-10 112z"
        />
      </g>
    </svg>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

function Footer() {
  return (
    <Box
      marginTop="90px"
      bg={useColorModeValue("blue.900", "blue.300")}
      color={useColorModeValue("blue.200", "#1a202c")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2021 De-Cent Books. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"#"}></SocialButton>
          <SocialButton label={"YouTube"} href={"#"}></SocialButton>
          <SocialButton label={"Instagram"} href={"#"}></SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
export default Footer;
