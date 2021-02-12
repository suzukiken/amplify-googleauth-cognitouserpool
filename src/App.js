import React from 'react'
import Navi from './Navi'
import EditCustomer from './EditCustomer'
import Order from './Order'
import Orders from './Orders'
import { BrowserRouter, Switch, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/order/:id/edit/">
            <EditCustomerPage />
          </Route>
          <Route path="/order/:id">
            <OrderPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

function EditCustomerPage() {
  return (
    <div className="App">
      <Navi />
      <EditCustomer />
    </div>
  )
}

function OrderPage() {
  return (
    <div className="App">
      <Navi />
      <Order />
    </div>
  )
}

function HomePage() {
  return (
    <div className="App">
      <Navi />
      <Orders />
    </div>
  )
}

export default App