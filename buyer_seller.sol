pragma solidity ^0.5.0;

import './Token.sol';

contract BookToken is ERC721 {
    address public book;
    bool public isBookSet = false;
    // To generate a new token for the specified address
    //  _to The receiver of this new token
    //  _tokenId The new token id, must be unique
    function mint(address _to, uint256 _tokenId) public {
        require(msg.sender == book, 'Only the Book contract can mint new tokens');
        _mint(_to, _tokenId);
    }

    // To set the book smart contract address
    function setBook(address _book) public {
        require(!isBookSet, 'The buyer-seller address can only be set once');
        require(_book != address(0), 'The book address cannot be empty');
        isBookSet = true;
        book = _book;
    }
}


contract BookStore {
    struct Book{
        uint256 id;
        string title;
        string isbn;
        string author;
        address payable owner;
        address[] previousOwners;  
        uint256 price;
        bool forSale;
    }
    struct Order {
        uint256 id;
        string name;
        string deliveryAddress;
        uint256 postalCode;
        uint256 phone;
        string state; // Either 'pending', 'completed'
    }
}