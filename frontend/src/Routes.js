import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AddBook from "./components/addBook";
import BuyBookForm from "./components/buyBookForm";
import ShowMyBooks from "./components/showMyBooks";
import ViewBooksForSale from "./components/viewBooksForSale";
import ViewBuyingOrders from "./components/viewBuyingOrders";
import ViewSellingOrders from "./components/viewSellingOrders";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/addBook" component={AddBook} />
        <Route path="/home" component={ViewBooksForSale} />
        <Route path="/myBooks" component={ShowMyBooks} />
        <Route path="/buyBook" component={BuyBookForm} />
        <Route path="/orders" component={ViewBuyingOrders} />
        <Route path="/dashboard" component={ViewSellingOrders} />
        <Route exact component={App} />
      </Switch>
    </BrowserRouter>
  );
}
