import React from 'react'
import Navi from './Navi'
import EditCustomer from './EditCustomer'
import EditIndex from './EditIndex'
import Orders from './Orders'
import { BrowserRouter, Switch, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/edit/customer">
            <EditCustomerPage />
          </Route>
          <Route path="/edit/">
            <EditIndexPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

class EditCustomerPage extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <EditCustomer />
      </div>
    )
  }
}

class EditIndexPage extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <EditIndex />
      </div>
    )
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <Orders />
      </div>
    )
  }
}
