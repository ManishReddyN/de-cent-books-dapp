import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MetaMaskProvider } from "metamask-react";
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const customTheme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </MetaMaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();