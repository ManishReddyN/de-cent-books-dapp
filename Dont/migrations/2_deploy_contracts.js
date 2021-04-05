const Token = artifacts.require("./BookToken.sol");
const BookStore = artifacts.require("./BookStore.sol");
let token;

module.exports = function (deployer, network, accounts) {
  deployer
    .deploy(Token, { gas: 6368005 })
    .then((tokenInstance) => {
      token = tokenInstance;
      return deployer.deploy(BookStore, token.address, {
        gas: 6368005,
        gasPrice: 20e9,
      });
    })
    .then(async (book) => {
      await token.contract.methods.setBook(BookStore.address).send({
        from: accounts[0],
        gas: 6368005,
        gasPrice: 20e9,
      });
      console.log("Is set?", await token.contract.methods.isBookSet().call());
      console.log("Deployed both!");
    });
};
