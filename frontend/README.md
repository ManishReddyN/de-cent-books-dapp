# De-Cent Books

### A decentralized book store application built using ReactJS and Ethereum Blockchain

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to run the react application locally

- ### Clone the repository locally

  ```bash
  git clone https://github.com/iamneowise/Blockchain-Buyer-Seller-Market-BC_Team_6.git
  ```

- ### Checkout to the front end branch
  ```bash
  cd Blockchain-Buyer-Seller-Market-BC_Team_6/frontend
  ```
- ### Install the dependencies
  ```bash
  npm i
  ```
- ### Start the application locally
  ```bash
  npm start
  ```

---

## Note:

### For the application to run perfectly, you need to run the blockchain backend and change the `config.js` file as follows:

1. Run the blockchain backend in the environment of your choice. The contract can be found in `back-end` branch.
1. Copy the deployment address and paste it in the `config.js` file in the address field. Deployment address can be found in the `BookStore.json` file in the build directory in the file end. If you are using **Remix IDE** you can copy it directly from the deployed location by clicking on the copy button beside deployed contract.
1. ABI is also found in the same file, in **Remix IDE** you will find it in the compile tab.
1. If you make any changes to the contract you also need to replace the ABI field, else leave it as it is.
1. Setup Metamask with the accounts that are generated and continue.

---

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
