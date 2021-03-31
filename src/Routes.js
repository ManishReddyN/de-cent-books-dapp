import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AddBook from "./components/addBook";
import ShowMyBooks from "./components/showMyBooks";
import ViewBooksForSale from "./components/viewBooksForSale";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/addBook" component={AddBook} />
        <Route path="/viewBooks" component={ViewBooksForSale} />
        <Route path="/myBooks" component={ShowMyBooks} />
        <Route exact component={App} />
      </Switch>
    </BrowserRouter>
  );
}
