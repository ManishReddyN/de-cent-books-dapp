const BookStore = artifacts.require("BookStore");
contract('BookStore',(accounts)=>{
  let bookStore=null;
  before(async () => {
    bookStore=await BookStore.deployed();
  });
  it('Books should be added',async()=>{
    const accounts = await web3.eth.getAccounts();
    await bookStore.addBook("Test","abc","Manasa","Mystery",1000,false,"https://www.google.com/search?q=mystery+books&rlz=1C1CHBD_enIN834IN834&sxsrf=ALeKk03-EpaWvDv3AS7b4BobtZg9sunw0Q:1617541542485&source=lnms&tbm=isch&sa=X&ved=2ahUKEwio8LHo0-TvAhWwumMGHU3VAwYQ_AUoA3oECAEQBQ&biw=1536&bih=722#imgrc=pH_uHUk21XLXJM");
    await bookStore.getBooksIds(1).then(result => {book1 = result[0]});
    const result=await bookStore.getBook(book1);
    assert(result[0]===book1);
    assert(result[1]==='Test');
    assert(result[2]==='abc');
    assert(result[3]==='Manasa');
    assert(result[4]==='Mystery');
    assert(result[5]===accounts[0]);
    assert(result[6].toNumber()===1000);
    assert(result[7]===false);
    assert(result[9]==="https://www.google.com/search?q=mystery+books&rlz=1C1CHBD_enIN834IN834&sxsrf=ALeKk03-EpaWvDv3AS7b4BobtZg9sunw0Q:1617541542485&source=lnms&tbm=isch&sa=X&ved=2ahUKEwio8LHo0-TvAhWwumMGHU3VAwYQ_AUoA3oECAEQBQ&biw=1536&bih=722#imgrc=pH_uHUk21XLXJM");
    
    await bookStore.addBook("Test1","xyz","Tina","Horror",1000,false,"https://www.google.com/search?q=horror+books&tbm=isch&ved=2ahUKEwjTxZfr0-TvAhXOJCsKHX7qAWwQ2-cCegQIABAA&oq=horr+books&gs_lcp=CgNpbWcQARgAMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB46BwgAELEDEEM6BAgAEEM6BQgAELEDOgIIAFCC7QtY-P4LYKWMDGgAcAB4AIABlQGIAZkEkgEDMi4zmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=rLlpYNO_FM7JrAH-1IfgBg&bih=722&biw=1536&rlz=1C1CHBD_enIN834IN834");
    await bookStore.getBooksIds(2).then(result => {book2 = result[1]});
    const result1=await bookStore.getBook(book2);
    assert(result1[0]===book2);
    assert(result1[1]==='Test1');
    assert(result1[2]==='xyz');
    assert(result1[3]==='Tina');
    assert(result1[4]==='Horror');
    assert(result1[5]===accounts[0]);
    assert(result1[6].toNumber()===1000);
    assert(result1[7]===false);
    assert(result1[9]==="https://www.google.com/search?q=horror+books&tbm=isch&ved=2ahUKEwjTxZfr0-TvAhXOJCsKHX7qAWwQ2-cCegQIABAA&oq=horr+books&gs_lcp=CgNpbWcQARgAMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB46BwgAELEDEEM6BAgAEEM6BQgAELEDOgIIAFCC7QtY-P4LYKWMDGgAcAB4AIABlQGIAZkEkgEDMi4zmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=rLlpYNO_FM7JrAH-1IfgBg&bih=722&biw=1536&rlz=1C1CHBD_enIN834IN834");
  
    await bookStore.addBook("Test2","ijk","John","Fiction",100,true,"https://www.google.com/search?q=fiction+books&tbm=isch&ved=2ahUKEwjerarK1OTvAhXCTCsKHf-aDWcQ2-cCegQIABAA&oq=fiction+&gs_lcp=CgNpbWcQARgAMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgIIADICCAAyAggAMgIIADICCAA6BwgjEOoCECc6BAgjECc6BQgAELEDOgcIABCxAxBDUNu7Flio4hZgte8WaAFwAHgAgAGkAYgBqwaSAQM2LjKYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABCsABAQ&sclient=img&ei=c7ppYJ6oNcKZrQH_tba4Bg&bih=722&biw=1536&rlz=1C1CHBD_enIN834IN834");
    await bookStore.getBooksIds(3).then(result => {book3 = result[2]});
    const result2=await bookStore.getBook(book3);
    assert(result2[0]===book3);
    assert(result2[1]==='Test2');
    assert(result2[2]==='ijk');
    assert(result2[3]==='John');
    assert(result2[4]==='Fiction');
    assert(result2[5]===accounts[0]);
    assert(result2[6].toNumber()===100);
    assert(result2[7]===true);
    //assert(result2[8]==="https://www.google.com/search?q=fiction+books&tbm=isch&ved=2ahUKEwjerarK1OTvAhXCTCsKHf-aDWcQ2-cCegQIABAA&oq=fiction+&gs_lcp=CgNpbWcQARgAMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgIIADICCAAyAggAMgIIADICCAA6BwgjEOoCECc6BAgjECc6BQgAELEDOgcIABCxAxBDUNu7Flio4hZgte8WaAFwAHgAgAGkAYgBqwaSAQM2LjKYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABCsABAQ&sclient=img&ei=c7ppYJ6oNcKZrQH_tba4Bg&bih=722&biw=1536&rlz=1C1CHBD_enIN834IN834");
  });

  it('Books should be added for sale',async()=>{
    await bookStore.sellBook(book1);
    await bookStore.sellBook(book2);
    const res=await bookStore.getBooksForSale(2);
    assert.deepEqual(res,[book1,book2]);
    
  });

  it('Books should be removed from sale',async()=>{
    await bookStore.unSellBook(book1);
    const res=await bookStore.getBooksForSale(1);
    assert.deepEqual(res,[book2]);
    
  });
  it('Get Ids of Books',async()=>{
    const bids=await bookStore.getBooksIds(3);
    assert.deepEqual(bids,[book1,book2,book3]);
    
  });
 it('Books should be bought',async()=>{
    await bookStore.buyBook(book2,"Manasa","Address1",500049,26608257,{from:accounts[2],value:1000});
    await bookStore.getOrdersLists().then(result=>{order1=result[0]});
    const ord1=await bookStore.getOrderById(order1);
    assert(ord1[0]===order1);
    assert(ord1[1]==='Manasa');
    assert(ord1[2]==='Address1');
    assert(ord1[3].words[0]===500049);
    assert(ord1[4].words[0]===26608257);
    assert(ord1[5]==='pending');
    assert(ord1[6]===accounts[2]);
    assert(ord1[7]==='Test1');
    assert(ord1[8]===accounts[0]);
    
  });
  it('Order should be marked as completed',async()=>{
    await bookStore.markOrderCompleted(order1);
    const orders=await bookStore.getOrdersLists();
    assert.deepEqual(orders,[order1]);
  });

});
