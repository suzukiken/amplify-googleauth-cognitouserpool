import React from 'react'
import Navi from './Navi'
import Editer from './Editer'
import Orders from './Orders'
import { BrowserRouter, Switch, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/edit/">
            <Edit />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

class Edit extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <Editer />
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <Orders />
      </div>
    )
  }
}
