# README

## Steps to Run the Backend locally

### Install Truffle and Ganache-Cli on the machine
 (Assuming that Node is already installed)

```bash
npm install -g truffle 
npm install -g ganache-cli
```
### Cloning Latest Updates

```bash
git clone https://github.com/iamneowise/Blockchain-Buyer-Seller-Market-BC_Team_6.git && cd Blockchain-Buyer-Seller-Market-BC_Team_6
```
### Deploying in your Machine
Start Ganache CLI
```bash
ganache-cli
```
Start a new terminal in the same directory and go into Truffle Console by 
```bash
truffle console
```

Use the migrate command to run migrations(if not done before)
```bash
truffle(development)> migrate
```

#### Output
```text
truffle(development)> migrate

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


2_deploy_contracts.js
=====================

   Deploying 'BookToken'
   ---------------------
   > transaction hash:    0x2701a840946a812cca8f10b02b1ea7750fee5b11cf2600d7d78e3c3819570969
   > Blocks: 0            Seconds: 0
   > contract address:    0xC886d8cA384E2B4703De5d2ED2222718d9b00594
   > block number:        8
   > block timestamp:     1617003799
   > account:             0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5
   > balance:             99.79787398
   > gas used:            1368005 (0x14dfc5)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0273601 ETH


   Deploying 'BookStore'
   ---------------------
   > transaction hash:    0x81fcc17a2dded6593465f11da9c47f0d86b4204c25b9ca03f04f833439bbbb02
   > Blocks: 0            Seconds: 0
   > contract address:    0xC3b86441236139d1dba352f23A2BfF9030Fc3d1B
   > block number:        9
   > block timestamp:     1617003800
   > account:             0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5
   > balance:             99.69461994
   > gas used:            5162702 (0x4ec6ce)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.10325404 ETH

Is set? true
Deployed both!

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.13061414 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.13061414 ETH


- Blocks: 0            Seconds: 0
- Blocks: 0            Seconds: 0
- Saving migration to chain.
```
### Create a BookStore Contract instance.
```bash
truffle(development)> BookStore.deployed().then(function(instance){app=instance})
```
You can use the following command to verify
```bash
truffle(development)> app
```

### Now that you have the Contract instance, you can call the functions in the contract as follows
e.g. Adding A Book to the Block
```bash
truffle(development)> app.addBook("Theory of Everything","ISBN0129","Stephen Hawking","Science",12367,false,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
```

#### Output
```text
{
  tx: '0x9b687183a31d9543b0a14a63d28935ceb65fd06f3f7300033f985ac67f42f1f8',
  receipt: {
    transactionHash: '0x9b687183a31d9543b0a14a63d28935ceb65fd06f3f7300033f985ac67f42f1f8',
    transactionIndex: 0,
    blockHash: '0xfe6448628e969a51b773d9466660d2709c216a49a1e8d53bef5aefb189596415',
    blockNumber: 12,
    from: '0x5016d8da9317425ac10f4d3e902a4b553f53ccd5',
    to: '0xc5f6ea947cfa075f876d3960c6f3fc323c3a1ba3',
    gasUsed: 410699,
    cumulativeGasUsed: 410699,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
```
### Get the IDs of the books

"app.getBooksIds(_limit)"
Note: Limit is the count of the IDs that will be returned. If the limit is greater than the available books, all the available books will be returned.

```bash
app.getBooksIds(1)
```

#### Output
```text
[
  '0x10f53c90c690b75262c8f5ed075e8d95cb39fe714c4032a24b79f992dd1e63a7'
]
```
#### Storing the first Book ID for future use.
```bash
app.getBooksIds(1).then(result => {book = result[0]});
```

### Get Details of a Book
```bash
app.getBook(book);
```

#### Output
```text
Result {
  '0': '0x10f53c90c690b75262c8f5ed075e8d95cb39fe714c4032a24b79f992dd1e63a7',
  '1': 'Theory of Everything',
  '2': 'ISBN0129',
  '3': 'Stephen Hawking',
  '4': 'Science',
  '5': '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5',
  '6': BN {
    negative: 0,
    words: [ 12367, <1 empty item> ],
    length: 1,
    red: null
  },
  '7': false,
  '8': false,
  '9': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD',
  id: '0x10f53c90c690b75262c8f5ed075e8d95cb39fe714c4032a24b79f992dd1e63a7',
  title: 'Theory of Everything',
  isbn: 'ISBN0129',
  author: 'Stephen Hawking',
  category: 'Science',
  owner: '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5',
  price: BN {
    negative: 0,
    words: [ 12367, <1 empty item> ],
    length: 1,
    red: null
  },
  forSale: false,
  sold: false,
  image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD'
}
```

### Mark the Book for Sale
```bash
app.sellBook(book);
```

### Saving Truffle Test Accounts in a variable for future use
```bash
web3.eth.getAccounts().then(function(result){accounts = result});
```

### Buying a Book
```bash
app.buyBook(book,"Sameer","MyHomeAddress",400291,93211121,{from: accounts[2],value: 12367});
```

### Accessing Orders List and Saving the latest order for future use
```bash
app.getOrdersLists().then(result=>{order1=result[0]});
```

### Get Order Details
```bash
app.getOrderById(order1);
```

#### Output
```text

Result {
  '0': '0x1547b1c5fc5c7661799cdb13136f0185a9aee8c25bdde984c5aa614dfe56c086',
  '1': 'Sameer',
  '2': 'MyHomeAddress',
  '3': BN {
    negative: 0,
    words: [ 400291, <1 empty item> ],
    length: 1,
    red: null
  },
  '4': BN {
    negative: 0,
    words: [ 934567, <1 empty item> ],
    length: 1,
    red: null
  },
  '5': 'pending',
  '6': '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  '7': 'Theory of Everything',
  '8': '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5',
  orderId: '0x1547b1c5fc5c7661799cdb13136f0185a9aee8c25bdde984c5aa614dfe56c086',
  name: 'Sameer',
  deliveryAddress: 'MyHomeAddress',
  postalCode: BN {
    negative: 0,
    words: [ 400291, <1 empty item> ],
    length: 1,
    red: null
  },
  phone: BN {
    negative: 0,
    words: [ 934567, <1 empty item> ],
    length: 1,
    red: null
  },
  state: 'pending',
  customer: '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  bookName: 'Theory of Everything',
  seller: '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5'
}
```

### Mark the Order as Completed (Seller Exclusive)
```bash
app.markOrderCompleted(order1);
```
##### Updated Order Info:
```text
Result {
  '0': '0x1547b1c5fc5c7661799cdb13136f0185a9aee8c25bdde984c5aa614dfe56c086',
  '1': 'Sameer',
  '2': 'MYhOME',
  '3': BN {
    negative: 0,
    words: [ 400291, <1 empty item> ],
    length: 1,
    red: null
  },
  '4': BN {
    negative: 0,
    words: [ 934567, <1 empty item> ],
    length: 1,
    red: null
  },
  '5': 'completed',
  '6': '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  '7': 'Theory of Everything',
  '8': '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5',
  orderId: '0x1547b1c5fc5c7661799cdb13136f0185a9aee8c25bdde984c5aa614dfe56c086',
  name: 'Sameer',
  deliveryAddress: 'MYhOME',
  postalCode: BN {
    negative: 0,
    words: [ 400291, <1 empty item> ],
    length: 1,
    red: null
  },
  phone: BN {
    negative: 0,
    words: [ 934567, <1 empty item> ],
    length: 1,
    red: null
  },
  state: 'completed',
  customer: '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  bookName: 'Theory of Everything',
  seller: '0x5016D8Da9317425ac10F4D3e902A4b553f53cCd5'
}
```

##### Updated Book Info
```text
Result {
  '0': '0x10f53c90c690b75262c8f5ed075e8d95cb39fe714c4032a24b79f992dd1e63a7',
  '1': 'Theory of Everything',
  '2': 'ISBN0129',
  '3': 'Stephen Hawking',
  '4': 'Science',
  '5': '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  '6': BN {
    negative: 0,
    words: [ 12367, <1 empty item> ],
    length: 1,
    red: null
  },
  '7': false,
  '8': false,
  '9': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD',
  id: '0x10f53c90c690b75262c8f5ed075e8d95cb39fe714c4032a24b79f992dd1e63a7',
  title: 'Theory of Everything',
  isbn: 'ISBN0129',
  author: 'Stephen Hawking',
  category: 'Science',
  owner: '0xC59Ae61257Da5cB29654c73958F0ad594885d4D2',
  price: BN {
    negative: 0,
    words: [ 12367, <1 empty item> ],
    length: 1,
    red: null
  },
  forSale: false,
  sold: false,
  image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD'
}
```

