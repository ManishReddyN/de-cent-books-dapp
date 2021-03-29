##Steps to Run the Backend locally

###Install Truffle and Ganache-Cli on the machine
 (Assuming that Node is already installed)

```bash
npm install -g truffle 
npm install -g ganache-cli
```
###Cloning Latest Updates

```bash
git clone https://github.com/iamneowise/Blockchain-Buyer-Seller-Market-BC_Team_6.git
```
###Deploying in your Machine

Go into Truffle Console by 
```bash
truffle develop
```

Use the migrate command to run migrations(if not done before)
```bash
truffle(develop)> migrate
```

##Output
```text
truffle(develop)> migrate

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
###Create a BookStore Contract instance.
```bash
truffle(develop)> BookStore.deployed().then(function(instance){app=instance})
```
You can use the following command to verify
```bash
truffle(develop)> app
```

###Now that you have the Contract instance, you can call the functions in the contract as follows
e.g. Adding A Book to the Block
```bash
truffle(develop)> app.addBook("Test","Testt","Sameer","Fiction",12367,false);
```

###Output
```text
{
  tx: '0x2a86a2bb60c55b081b7b82edf73d7c24cb30eb939d9da3f7aaa0cef82bcfa627',
  receipt: {
    transactionHash: '0x2a86a2bb60c55b081b7b82edf73d7c24cb30eb939d9da3f7aaa0cef82bcfa627',
    transactionIndex: 0,
    blockHash: '0xcbbad1549f43908340e1da094bb86a561ef326540b91fadfcb85c32fa6e5bfb8',
    blockNumber: 12,
    from: '0x5016d8da9317425ac10f4d3e902a4b553f53ccd5',
    to: '0xc3b86441236139d1dba352f23a2bff9030fc3d1b',
    gasUsed: 545412,
    cumulativeGasUsed: 545412,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000002000000000000000000000000000004000000000000000008000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000002000800000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: [ [Object] ]
  },
  logs: []
}
```