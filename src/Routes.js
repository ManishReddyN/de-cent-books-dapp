import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AddBook from "./components/addBook/addBook";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/addBook" component={AddBook} />
        <Route exact component={App} />
      </Switch>
    </BrowserRouter>
  );
}
