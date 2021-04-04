pragma solidity ^0.5.0;

contract BookStore {
    struct Book {
        bytes32 id;
        string title;
        string isbn;
        string author;
        string category;
        address payable owner;
        uint256 price;
        bool forSale;
        string image;
        bool sold;
    }
    struct Order {
        bytes32 id;
        bytes32 bookId;
        string name;
        string deliveryAddress;
        uint256 postalCode;
        uint256 phone;
        string state; // Either 'pending', 'completed'
        string bookName;
        address customer;
        address seller;
    }

    mapping(address => mapping(bytes32 => bytes32)) public ownerProducts; // Seller address => books ; The books added by the seller
    mapping(address => mapping(bytes32 => bytes32)) public pendingSellerOrders; // Seller address => orders ; The books waiting to be fulfilled by the seller, used by sellers to check which orders have to be fulfilled
    mapping(address => mapping(bytes32 => bytes32)) public pendingBuyerOrders; //Buyer address => orders ;The books that the buyer purchased waiting to be sent
    mapping(address => mapping(bytes32 => bytes32))
        public completedSellerOrders; // Seller address => orders  A history of past orders fulfilled by the seller
    mapping(address => mapping(bytes32 => bytes32)) public completedBuyerOrders; // Buyer address => orders A history of past orders made by this buyer
    mapping(address => bytes32[]) public userOrders;
    mapping(bytes32 => Book) public bookById; // Book id => book

    mapping(bytes32 => address[]) public previousOwners; // Book id => previousOwners
    mapping(bytes32 => Order) public orderById; // book id => order
    mapping(bytes32 => bool) public bookExists; // Book id => true or false
    bytes32[] public books;
    bytes32[] public orders;
    mapping(bytes32 => bytes32) public booksForSale;
    uint256 public lastId;
    address public token;
    uint256 public lastPendingSellerOrder;
    uint256 public lastPendingBuyerOrder;

    function addBook(
        string memory _title,
        string memory _isbn,
        string memory _author,
        string memory _category,
        uint256 _price,
        bool _forSale,
        string memory _image
    ) public {
        require(bytes(_title).length > 0, "Book Name is necessary");
        require(bytes(_isbn).length > 0, "ISBN is necessary");
        require(bytes(_author).length > 0, "Author Name is necessary");
        require(_price > 0, "Price is necessary");
        if (!(_forSale)) _forSale = false;
        address payable owner = msg.sender;
        bytes32 id = sha256(abi.encodePacked(_title, _isbn, _author, owner));
        require(bookExists[id] == false, "Book already exists");
        Book memory b =
            Book(
                id,
                _title,
                _isbn,
                _author,
                _category,
                owner,
                _price,
                _forSale,
                _image,
                false
            );
        books.push(id);
        ownerProducts[msg.sender][id] = id;
        bookById[id] = b;
        bookExists[id] = true;
    }

    function sellBook(bytes32 _id) public {
        require(bookExists[_id] == true, "Book doesn't exist");
        bookById[_id].forSale = true;
        booksForSale[_id] = _id;
    }
    function unSellBook(bytes32 _id) public {
        require(bookExists[_id] == true, "Book doesn't exist");
        bookById[_id].forSale = false;
        booksForSale[_id] = _id;
    }

    function buyBook(
        bytes32 _id,
        string memory _name,
        string memory _deliveryAddress,
        uint256 _postalCode,
        uint256 _phone
    ) public payable {
        require(bookExists[_id], "The book must exist to be purchased");
        require(bytes(_name).length > 0, "The name must be set");
        require(
            bytes(_deliveryAddress).length > 0,
            "The Delivery Address must be set"
        );
        require(_postalCode > 0, "The postal code must be set");
        require(_phone > 0, "The Phone Number must be set");
        address payable customer = msg.sender;
        bytes32 id =
            sha256(abi.encodePacked(_name, _id, _deliveryAddress, customer)); // using name, book id , delivery address and customer address to make order id
        Book memory b = bookById[_id]; //Need to retrieve the book by it's id.
        string memory bookName=b.title;
        Order memory newOrder =
            Order(
                id,
                _id,
                _name,
                _deliveryAddress,
                _postalCode,
                _phone,
                "pending",
                bookName,
                msg.sender,
                b.owner
            );
        require(
            msg.value == b.price,
            "The payment must be equal to the book price"
        );

        pendingSellerOrders[b.owner][id] = id;
        pendingBuyerOrders[customer][id] = id;
        userOrders[b.owner].push(id);
        userOrders[customer].push(id);
        orders.push(id);
        orderById[id] = newOrder;
        delete (booksForSale[id]);
        bookById[_id].forSale = false;
        bookById[_id].sold = true;
        b.owner.transfer(b.price);
    }

    function markOrderCompleted(bytes32 _id) public {
        Order memory order = orderById[_id];
        Book memory book = bookById[order.bookId];
        require(
            book.owner == msg.sender,
            "Only the seller can mark the order as completed"
        );
        orderById[_id].state = "completed";
        address customer = order.customer;
        bookById[order.bookId].owner = address(uint160(customer));
        previousOwners[book.id].push(msg.sender);
        bytes32 bookId = ownerProducts[msg.sender][book.id];
        bookById[book.id].forSale=false;
        bookById[book.id].sold=false;
        ownerProducts[customer][bookId] = bookId;
    }


    function getBooksIds(int256 _limit) public view returns (bytes32[] memory) {
        int256 length = int256(books.length);
        int256 start = length - 1;
        int256 end = 0;
        if (_limit > length) {
            end = 0;
        } else {
            end = length - _limit;
        }
        uint256 size = (length) > _limit ? uint256(_limit) : uint256(length);
        bytes32[] memory ids = new bytes32[](size);
        uint256 inc = 0;
        for (int256 i = end; i <= start; i++) {
            bytes32 bookId = books[uint256(i)];
            if (
                bookId !=
                0x0000000000000000000000000000000000000000000000000000000000000000
            ) {
                ids[inc] = bookId;
                inc += 1;
            }
            if (inc > uint256(_limit)) {
                break;
            }
        }
        return ids;
    }

    function getBook(bytes32 _id)
        public
        view
        returns (
            bytes32 id,
            string memory title,
            string memory isbn,
            string memory author,
            string memory category,
            address payable owner,
            uint256 price,
            bool forSale,
            bool sold,
            string memory image
        )
    {
        Book memory b = bookById[_id];
        id = b.id;
        title = b.title;
        isbn = b.isbn;
        author = b.author;
        category = b.category;
        owner = b.owner;
        price = b.price;
        forSale = b.forSale;
        sold=b.sold;
        image = b.image;
    }

    

    function getBooksForSale(uint256 _limit)
        public
        view
        returns (bytes32[] memory)
    {
        uint256 length;
        length = uint256(books.length);
        bytes32[] memory ids = new bytes32[](_limit);
        uint256 inc = 0;
        for (uint256 i = 0; i < length; i++) {
            bytes32 id = booksForSale[books[i]];
            if (id != 0x0000000000000000000000000000000000000000000000000000000000000000 && bookById[id].forSale==true && bookById[id].sold==false) {
                ids[inc] = id;
                inc ++;
                if (inc > _limit) {
                    break;
                }
            }
        }
        return ids;
    }
    function getSentAddress() public view returns (address){
        return msg.sender;
    }

    function getOrdersLists()
        public
        view
        returns (bytes32[] memory)
    {
        return orders;
    }

    function getOrderById(bytes32 id)
        public
        view
        returns (
            bytes32 orderId,
            string memory name,
            string memory deliveryAddress,
            uint256 postalCode,
            uint256 phone,
            string memory state,
            address customer,
            string memory bookName,
            address seller
        )
    {
        Order memory o;
        o = orderById[id];
        orderId = o.id;
        name = o.name;
        deliveryAddress = o.deliveryAddress;
        postalCode = o.postalCode;
        phone = o.phone;
        state = o.state;
        customer = o.customer;
        bookName=o.bookName;
        seller=o.seller;
    }
}
