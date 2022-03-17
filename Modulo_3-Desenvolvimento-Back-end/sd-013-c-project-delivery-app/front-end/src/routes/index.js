import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from '../pages/Register';
import Trybe from '../pages/Trybe';
import Login from '../pages/Login';
import CustomerCheckout from '../pages/CustomerCheckout';
import CustomerProducts from '../pages/CustomerProducts';
import SellerOrders from '../pages/SellerOrders';
import SellerOrderDetails from '../pages/SellerOrderDetails';
import CustomerOrders from '../pages/CustomerOrders';
import CustomerAllOrders from '../pages/CustomerAllOrders';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />

      <Route exact path="/trybe" component={ Trybe } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route exact path="/customer/orders" component={ CustomerAllOrders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route exact path="/customer/orders/:id" component={ CustomerOrders } />
    </Switch>
  );
}

export default Routes;
