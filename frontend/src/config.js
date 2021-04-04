export const Book_Store_Address = "0x969341D791eFd797FC639e4FF726b0209dfa5DdB";

export const Book_Store_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_title",
        type: "string",
      },
      {
        name: "_isbn",
        type: "string",
      },
      {
        name: "_author",
        type: "string",
      },
      {
        name: "_category",
        type: "string",
      },
      {
        name: "_price",
        type: "uint256",
      },
      {
        name: "_forSale",
        type: "bool",
      },
      {
        name: "_image",
        type: "string",
      },
    ],
    name: "addBook",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_id",
        type: "bytes32",
      },
      {
        name: "_name",
        type: "string",
      },
      {
        name: "_deliveryAddress",
        type: "string",
      },
      {
        name: "_postalCode",
        type: "uint256",
      },
      {
        name: "_phone",
        type: "uint256",
      },
    ],
    name: "buyBook",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "markOrderCompleted",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "sellBook",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "unSellBook",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "bookById",
    outputs: [
      {
        name: "id",
        type: "bytes32",
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "isbn",
        type: "string",
      },
      {
        name: "author",
        type: "string",
      },
      {
        name: "category",
        type: "string",
      },
      {
        name: "owner",
        type: "address",
      },
      {
        name: "price",
        type: "uint256",
      },
      {
        name: "forSale",
        type: "bool",
      },
      {
        name: "image",
        type: "string",
      },
      {
        name: "sold",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "bookExists",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "books",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "booksForSale",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "completedBuyerOrders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "completedSellerOrders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "getBook",
    outputs: [
      {
        name: "id",
        type: "bytes32",
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "isbn",
        type: "string",
      },
      {
        name: "author",
        type: "string",
      },
      {
        name: "category",
        type: "string",
      },
      {
        name: "owner",
        type: "address",
      },
      {
        name: "price",
        type: "uint256",
      },
      {
        name: "forSale",
        type: "bool",
      },
      {
        name: "sold",
        type: "bool",
      },
      {
        name: "image",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_limit",
        type: "uint256",
      },
    ],
    name: "getBooksForSale",
    outputs: [
      {
        name: "",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_limit",
        type: "int256",
      },
    ],
    name: "getBooksIds",
    outputs: [
      {
        name: "",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getOrderById",
    outputs: [
      {
        name: "orderId",
        type: "bytes32",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "deliveryAddress",
        type: "string",
      },
      {
        name: "postalCode",
        type: "uint256",
      },
      {
        name: "phone",
        type: "uint256",
      },
      {
        name: "state",
        type: "string",
      },
      {
        name: "customer",
        type: "address",
      },
      {
        name: "bookName",
        type: "string",
      },
      {
        name: "seller",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOrdersLists",
    outputs: [
      {
        name: "",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getSentAddress",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lastId",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lastPendingBuyerOrder",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lastPendingSellerOrder",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "orderById",
    outputs: [
      {
        name: "id",
        type: "bytes32",
      },
      {
        name: "bookId",
        type: "bytes32",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "deliveryAddress",
        type: "string",
      },
      {
        name: "postalCode",
        type: "uint256",
      },
      {
        name: "phone",
        type: "uint256",
      },
      {
        name: "state",
        type: "string",
      },
      {
        name: "bookName",
        type: "string",
      },
      {
        name: "customer",
        type: "address",
      },
      {
        name: "seller",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "orders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "ownerProducts",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "pendingBuyerOrders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "pendingSellerOrders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "previousOwners",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "userOrders",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
