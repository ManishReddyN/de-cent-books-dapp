const Token = artifacts.require("./BookToken.sol")
const BookStore = artifacts.require("./BookStore.sol")
let token

module.exports = function(deployer, network, accounts) {
    deployer.deploy(
        Token
    ).then(tokenInstance => {
        token = tokenInstance
        return deployer.deploy(BookStore, token.address)
    }).then(async book => {
        await token.contract.methods.setBook(BookStore.address).send({
            from: accounts[0]
        })
        console.log('Is set?', await token.contract.methods.isBookSet().call())
        console.log('Deployed both!')
    })
}