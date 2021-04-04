const BookStore = artifacts.require("./BookStore.sol");
module.exports = function (deployer, network, accounts) {
  deployer.deploy(BookStore);
};
