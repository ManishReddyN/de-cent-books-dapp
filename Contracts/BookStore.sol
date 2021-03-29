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
        string category;
        address payable owner; 
        uint256 price;
        bool forSale;
        string image;
    }
    struct Order {
        uint256 id;
        string name;
        string deliveryAddress;
        uint256 postalCode;
        uint256 phone;
        string state; // Either 'pending', 'completed'
        address customer;
    }
    
    mapping(address => Book[]) public sellerProducts; // Seller address => books ; The books added by the seller 
    mapping(address => Order[]) public pendingSellerOrders; // Seller address => orders ; The books waiting to be fulfilled by the seller, used by sellers to check which orders have to be fulfilled
    mapping(address => Order[]) public pendingBuyerOrders; //Buyer address => orders ;The books that the buyer purchased waiting to be sent
    mapping(address => Order[]) public completedSellerOrders; // Seller address => orders  A history of past orders fulfilled by the seller
    mapping(address => Order[]) public completedBuyerOrders; // Buyer address => orders A history of past orders made by this buyer
    mapping(uint256 => Book) public bookById; // Book id => book
    mapping(uint256 => address[]) public previousOwners; // Book id => previousOwners
    mapping(uint256 => Order) public orderById; // book id => order
    mapping(uint256 => bool) public bookExists; // Book id => true or false
    Book[] public books;
    Order[] public orders;
    uint256 public lastId;
    address public token;
    uint256 public lastPendingSellerOrder;
    uint256 public lastPendingBuyerOrder;

    constructor(address _token) public {
        token = _token;
    }
    
    function addBook(string memory _title, string memory _isbn, string memory _author, string memory _category, uint256 _price, bool _forSale, string memory _image) public{
        require(bytes(_title).length>0,'Book Name is necessary');
        require(bytes(_isbn).length>0,'ISBN is necessary');
        require(bytes(_author).length>0,'Author Name is necessary');
        require(_price>0,'Price is necessary');
        if(!(_forSale)) _forSale = false;
        address payable owner = msg.sender;

        Book memory b = Book(lastId,_title,_isbn,_author,_category,owner,_price,_forSale,_image);
        books.push(b);
        sellerProducts[msg.sender].push(b);
        bookById[lastId]=b;
        bookExists[lastId]=true;
        BookToken(token).mint(address(this),lastId); // New token for this book owned by the contract until sold.
        lastId+=1;
    }

    function sellBook(uint256 _id) public{
        require(_id>=0,'ID is necessary');
        bookById[_id].forSale=true;
    }



    function buyBook(uint256 _id, string memory _name, string memory _deliveryAddress, uint256 _postalCode, uint256 _phone) public payable {
        require(bookExists[_id], 'The book must exist to be purchased');
        require(bytes(_name).length > 0, 'The name must be set');
        require(bytes(_deliveryAddress).length > 0, 'The Delivery Address must be set');
        require(_postalCode > 0, 'The postal code must be set');
        require(_phone > 0, 'The Phone Number must be set');

        Book memory b = bookById[_id]; //Need to retrieve the book by it's id. 
        Order memory newOrder = Order(_id, _name, _deliveryAddress, _postalCode, _phone, 'pending',msg.sender);
        require(msg.value >= b.price, "The payment must be equal to the book price");

        pendingSellerOrders[b.owner].push(newOrder);
        pendingBuyerOrders[msg.sender].push(newOrder);
        orders.push(newOrder);
        orderById[_id] = newOrder;
        lastPendingSellerOrder = pendingSellerOrders[b.owner].length > 0 ? pendingSellerOrders[b.owner].length - 1 : 0;
        lastPendingBuyerOrder = pendingBuyerOrders[b.owner].length > 0 ? pendingBuyerOrders[b.owner].length - 1 : 0;
        BookToken(token).transferFrom(b.owner, msg.sender, _id); // Transfer the book token to the new owner
        b.owner.transfer(b.price);
    }

    function markOrderCompleted(uint256 _id) public {
        Order memory order = orderById[_id];
        Book memory book = bookById[_id];
        require(book.owner == msg.sender, 'Only the seller can mark the order as completed');
        order.state = 'completed';
        address customer = order.customer;
        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingSellerOrders[book.owner].length; i++) {
            if(pendingSellerOrders[book.owner][i].id == _id) {
                Order memory lastElement = orderById[lastPendingSellerOrder];
                pendingSellerOrders[book.owner][i] = lastElement;
                pendingSellerOrders[book.owner].length--;
                lastPendingSellerOrder--;
            }
        }
        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingBuyerOrders[msg.sender].length; i++) {
            if(pendingBuyerOrders[msg.sender][i].id == order.id) {
                Order memory lastElement = orderById[lastPendingBuyerOrder];
                pendingBuyerOrders[msg.sender][i] = lastElement;
                pendingBuyerOrders[msg.sender].length--;
                lastPendingBuyerOrder--;
            }
        }
        completedSellerOrders[book.owner].push(order);
        completedBuyerOrders[msg.sender].push(order);
        orderById[_id] = order;
        book.owner = address(uint160(customer));
        previousOwners[_id].push(msg.sender);
    }

    function getBookIds(uint256 _limit) public view returns(uint256[] memory) {
        
        uint256 length = books.length;
        uint256 counter = (_limit > length) ? length : _limit; // If you're requesting more books than available, return only the available
        uint256 condition = (_limit > length) ? 0 : (length - _limit); 
        uint256[] memory ids = new uint256[](_limit > length ? _limit : length);
        uint256 increment = 0;
        // Loop backwards to get the most recent products first
        for(int256 i = int256(counter); i >= int256(condition); i--) {
            ids[increment] = books[uint256(i)].id;
        }
        return ids;
    }

    function getBook(uint256 _id) public view returns(uint256 id, string memory title, string memory isbn, string author, string category, address payable owner,unit256 price,bool forSale ,string memory image) {
        Book memory b = bookById[_id];
        id = b.id;
        title = b.title;
        isbn = b.isbn;
        author = b.author;
        category = b.category;
        owner = b.owner;
        price = p.price;
        forSale = b.forSale;
        image = p.image;
    }

    function getBookIds(string memory _type, uint256 _limit) public view returns(uint256[] memory) {
        uint256 length;
        uint256 counter;
        uint256 condition;
        uint256[] memory ids;
        uint256 increment = 0;
        address _owner = msg.sender;

        if(compareStrings(_type, 'pending-seller')) {
            length = pendingSellerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(pendingSellerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'pending-buyer')) {
            length = pendingBuyerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(pendingBuyerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'completed-seller')) {
            length = completedSellerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(completedSellerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'completed-buyer')) {
            length = completedBuyerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(completedBuyerOrders[_owner][uint256(i)].id);
            }
        }

        return ids;
    }

    function getOrder(string memory _type, uint256 _id) public view returns(uint256 id, string memory name, string memory deliveryAddress, uint256 postalCode, uint256 phone, string memory state,address customer) {
        Order memory o;
        address _owner = msg.sender;
        if(compareStrings(_type, 'pending-seller')) {
            o = pendingSellerOrders[_owner][_id];
        } else if(compareStrings(_type, 'pending-buyer')) {
            o = pendingBuyerOrders[_owner][_id];
        } else if(compareStrings(_type, 'completed-seller')) {
            o = completedSellerOrders[_owner][_id];
        } else if(compareStrings(_type, 'completed-buyer')) {
            o = completedBuyerOrders[_owner][_id];
        }

        id = o.id;
        name = o.name;
        deliveryAddress = o.deliveryAddress;
        postalCode = o.postalCode;
        phone = o.phone;
        state = o.state;
    }


    function compareStrings(string memory a, string memory b) public pure returns (bool) {
       return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

}