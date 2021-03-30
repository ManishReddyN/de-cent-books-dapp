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
    }
    struct Order {
        bytes32 id;
        bytes32 bookId;
        string name;
        string deliveryAddress;
        uint256 postalCode;
        uint256 phone;
        string state; // Either 'pending', 'completed'
        address customer;
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
                _image
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
        Order memory newOrder =
            Order(
                id,
                _id,
                _name,
                _deliveryAddress,
                _postalCode,
                _phone,
                "pending",
                msg.sender
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
        b.owner.transfer(b.price);
    }

    function markOrderCompleted(bytes32 _id) public {
        Order memory order = orderById[_id];
        Book memory book = bookById[order.bookId];
        require(
            book.owner == msg.sender,
            "Only the seller can mark the order as completed"
        );
        order.state = "completed";
        address customer = order.customer;
        bytes32 pendingSellerOrderId = pendingSellerOrders[msg.sender][_id];
        bytes32 pendingBuyerOrderId = pendingBuyerOrders[customer][_id];
        completedSellerOrders[msg.sender][_id] = pendingSellerOrderId;
        completedBuyerOrders[customer][_id] = pendingBuyerOrderId;
        delete (pendingSellerOrders[msg.sender][_id]);
        delete (pendingBuyerOrders[customer][_id]);
        book.owner = address(uint160(customer));
        previousOwners[book.id].push(msg.sender);
        bytes32 bookId = ownerProducts[msg.sender][book.id];
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
        bytes32[] memory ids = new bytes32[](uint256(start - end + 1));
        uint256 inc = 0;
        for (int256 i = end; i <= start; i++) {
            ids[inc] = (books[uint256(i)]);
            inc += 1;
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
        image = b.image;
    }

    function getOrders(string memory _type)
        public
        view
        returns (bytes32[] memory)
    {
        int256 length;
        address _owner = msg.sender;

        if (compareStrings(_type, "pending-seller")) {
            length = int256(userOrders[_owner].length);
            int256 start = length - 1;
            int256 end = 0;
            bytes32[] memory ids = new bytes32[](uint256(start - end + 1));
            for (int256 i = 0; i < length; i++) {
                bytes32 id =
                    pendingSellerOrders[_owner][userOrders[_owner][uint256(i)]];
                uint256 inc = 0;
                if (
                    id !=
                    0x0000000000000000000000000000000000000000000000000000000000000000
                ) {
                    ids[inc] = id;
                    inc += 1;
                }
            }
            return ids;
        } else if (compareStrings(_type, "pending-buyer")) {
            length = int256(userOrders[_owner].length);
            int256 start = length - 1;
            int256 end = 0;
            bytes32[] memory ids = new bytes32[](uint256(start - end + 1));
            for (int256 i = 0; i < length; i++) {
                bytes32 id =
                    pendingBuyerOrders[_owner][userOrders[_owner][uint256(i)]];
                uint256 inc = 0;
                if (
                    id !=
                    0x0000000000000000000000000000000000000000000000000000000000000000
                ) {
                    ids[inc] = id;
                    inc += 1;
                }
            }
            return ids;
        } else if (compareStrings(_type, "completed-seller")) {
            length = int256(userOrders[_owner].length);
            int256 start = length - 1;
            int256 end = 0;
            bytes32[] memory ids = new bytes32[](uint256(start - end + 1));
            for (int256 i = 0; i < length; i++) {
                bytes32 id =
                    completedSellerOrders[_owner][
                        userOrders[_owner][uint256(i)]
                    ];
                uint256 inc = 0;
                if (
                    id !=
                    0x0000000000000000000000000000000000000000000000000000000000000000
                ) {
                    ids[inc] = id;
                    inc += 1;
                }
            }
            return ids;
        } else if (compareStrings(_type, "completed-buyer")) {
            length = int256(userOrders[_owner].length);
            int256 start = length - 1;
            int256 end = 0;
            bytes32[] memory ids = new bytes32[](uint256(start - end + 1));
            for (int256 i = 0; i < length; i++) {
                bytes32 id =
                    completedBuyerOrders[_owner][
                        userOrders[_owner][uint256(i)]
                    ];
                uint256 inc = 0;
                if (
                    id !=
                    0x0000000000000000000000000000000000000000000000000000000000000000
                ) {
                    ids[inc] = id;
                    inc += 1;
                }
            }
            return ids;
        }
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
            address customer
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
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
