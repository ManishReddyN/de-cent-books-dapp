const BookStore = artifacts.require("BookStore");
contract('BookStore',()=>{
  let bookStore=null;
  before(async () => {
    bookStore=await BookStore.deployed();
  });
  it('Books should be added',async()=>{
    await bookStore.addBook("Test","abc","Manasa","Mystery",1000,false,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    const result=await bookStore.getBook('0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597');
    assert(result[0]==='0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597');
    assert(result[1]==='Test');
    assert(result[2]==='abc');
    assert(result[3]==='Manasa');
    assert(result[4]==='Mystery');
    assert(result[5]==='0xb9CbfB74917fD9b7B67525F6AFb6EC29998B6680');
    assert(result[6].toNumber()===1000);
    assert(result[7]===false);
    assert(result[8]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    
    await bookStore.addBook("Test1","xyz","Tina","Horror",1000,false,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    const result1=await bookStore.getBook('0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da');
    assert(result1[0]==='0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da');
    assert(result1[1]==='Test1');
    assert(result1[2]==='xyz');
    assert(result1[3]==='Tina');
    assert(result1[4]==='Horror');
    assert(result1[5]==='0xb9CbfB74917fD9b7B67525F6AFb6EC29998B6680');
    assert(result1[6].toNumber()===1000);
    assert(result1[7]===false);
    assert(result1[8]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
  
    await bookStore.addBook("Test2","ijk","John","Fiction",100,true,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
    const result2=await bookStore.getBook('0x54826de935030f85f6568c475c404999f32476f2faff5d2fd7fb3f7af4eeafe3');
    assert(result2[0]==='0x54826de935030f85f6568c475c404999f32476f2faff5d2fd7fb3f7af4eeafe3');
    assert(result2[1]==='Test2');
    assert(result2[2]==='ijk');
    assert(result2[3]==='John');
    assert(result2[4]==='Fiction');
    assert(result2[5]==='0xb9CbfB74917fD9b7B67525F6AFb6EC29998B6680');
    assert(result2[6].toNumber()===100);
    assert(result2[7]===true);
    assert(result2[8]==="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetaMask&psig=AOvVaw01YKJ1Z0HUnd4AxTrJCq9u&ust=1617105710033000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCQg6261e8CFQAAAAAdAAAAABAD");
  });

  it('Books should be added for sale',async()=>{
    await bookStore.sellBook('0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597');
    await bookStore.sellBook('0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da');
    const res=await bookStore.getBooksForSale(2);
    assert.deepEqual(res,['0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597','0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da']);
    
  });

  it('Books should be removed from sale',async()=>{
    await bookStore.unSellBook('0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597');
    const res=await bookStore.getBooksForSale(2);
    assert.deepEqual(res,['0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597','0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da']);
    
  });
  it('Get Ids of Books',async()=>{
    const bids=await bookStore.getBooksIds(3);
    assert.deepEqual(bids,['0x4fc91b7ad52938ac129f34c5f334bc58229d399788ed253e832a74b8ff386597','0x281271bc23cbb04bce6e6a805ceaac08f1e43dec98d993a98f73ee33808c28da','0x54826de935030f85f6568c475c404999f32476f2faff5d2fd7fb3f7af4eeafe3']);
    
  });

});
