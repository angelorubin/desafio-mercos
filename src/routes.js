import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "pages/cart";
import Checkout from "pages/checkout";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
