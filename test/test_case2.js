const BookStore = artifacts.require("BookStore");
contract('BookStore',()=>{
  let bookStore = null;
  var booksIds = null;
  var sellBooksIds = [];
  var addBooksIds = []
  var orders = [];
  var pageSize = 10;
  before(async () => {
    bookStore=await BookStore.deployed();
    
  });

  it('Books should be added',async()=>{
    const accounts = await web3.eth.getAccounts();
    await bookStore.addBook("Test1","Testt1","Sai1","Fiction",19,false,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    booksIds = await bookStore.getBooksIds(pageSize);
    //console.log(booksIds[0]);
    addBooksIds.push(booksIds[0]);
    const result = await bookStore.getBook(booksIds[0]);
    assert(result[0]===booksIds[0]);
    assert(result[1]==='Test1');
    assert(result[2]==='Testt1');
    assert(result[3]==='Sai1');
    assert(result[4]==='Fiction');
    assert(result[5]===accounts[0]);
    assert(result[6].toNumber()===19);
    assert(result[7]===false);
    assert(result[9]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    
    await bookStore.addBook("Test2","Testt2","Sai2","Action And Adeventure",18,false,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    booksIds = await bookStore.getBooksIds(pageSize);
    addBooksIds.push(booksIds[1]);
    const result1=await bookStore.getBook(booksIds[1]);
    assert(result1[0]===booksIds[1]);
    assert(result1[1]==='Test2');
    assert(result1[2]==='Testt2');
    assert(result1[3]==='Sai2');
    assert(result1[4]==='Action And Adeventure');
    assert(result1[5]===accounts[0]);
    assert(result1[6].toNumber()===18);
    assert(result1[7]===false);
    assert(result1[9]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
  
    await bookStore.addBook("Test3","Testt3","Sai3","Detective And Mystery",1918,true,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    booksIds = await bookStore.getBooksIds(pageSize);
    addBooksIds.push(booksIds[2]);
    const result2=await bookStore.getBook(booksIds[2]);
    assert(result2[0]===booksIds[2]);
    assert(result2[1]==='Test3');
    assert(result2[2]==='Testt3');
    assert(result2[3]==='Sai3');
    assert(result2[4]==='Detective And Mystery');
    assert(result2[5]===accounts[0]);
    assert(result2[6].toNumber()===1918);
    assert(result2[7]===true);
    assert(result2[9]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    
  });

  it('Books should be added for sale',async()=>{
    await bookStore.sellBook(booksIds[0]);
    await bookStore.sellBook(booksIds[1]);
    await bookStore.sellBook(booksIds[2]);
    sellBooksIds.push(booksIds[0]);
    sellBooksIds.push(booksIds[1]);
    sellBooksIds.push(booksIds[2]);
    const res=await bookStore.getBooksForSale(3);
    assert.deepEqual(res,sellBooksIds);
    
  });

  it('Books should be removed from sale',async()=>{
    await bookStore.unSellBook(booksIds[0]);
    const res=await bookStore.getBooksForSale(3);
  });

  it('Get Ids of Books',async()=>{
    const bids=await bookStore.getBooksIds(pageSize);
    assert.deepEqual(bids,addBooksIds);
  });

  it('Books should be bought',async()=>{
    const accounts = await web3.eth.getAccounts();
    await bookStore.buyBook(booksIds[1],"Sai","Address1",500018,12345678,{from:accounts[4],value:18});
    
    const order1 = await bookStore.getOrdersLists();
    await bookStore.getOrderById(order1[0]).then(ord=>{
      assert(ord[0]===order1[0]);
      assert(ord[1]==='Sai');
      assert(ord[2]==='Address1');
      assert(ord[3].words[0]=== 500018);
      assert(ord[4].words[0]=== 12345678);
      assert(ord[5]==='pending');
      assert(ord[6]=== accounts[4]);
      assert(ord[7]==="Test2");
      assert(ord[8]===accounts[0]);
    });
    
  });

  it('Order should be marked as completed',async()=>{
    const res=await bookStore.getOrdersLists();
    await bookStore.markOrderCompleted(res[0]);
    orders.push(res[0]);
    assert.deepEqual(res,orders);

  });

});