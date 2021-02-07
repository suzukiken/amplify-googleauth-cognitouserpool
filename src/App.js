import React from 'react' // useEffect
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { getOrder, searchOrder } from './graphql/queries'
import awsExports from "./aws-exports"

Amplify.configure(awsExports)

function App() {
  
  async function sign_in() {
    try {
      await Auth.federatedSignIn()
    } catch (err) {
      console.log('error signIn:', err)
    } finally {
      console.log('done signIn')
    }
  }
  
  async function sign_out() {
    try {
      await Auth.signOut()
    } catch (err) {
      console.log('error signOut:', err)
    } finally {
      console.log('done signOut')
    }
  }
  
  async function get_order() {
    try {
      const query_response = await API.graphql(graphqlOperation(getOrder, {id: 1}))
      console.log(query_response.data)
    } catch (err) { console.log('error get order') }
  }
  
  async function search_order() {
    try {
      const query_response = await API.graphql(graphqlOperation(searchOrder, {prefecture: "県"}))
      console.log(query_response.data)
    } catch (err) { console.log('error search order') }
  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <button onClick={sign_in}>Sign In</button>
      <button onClick={sign_out}>Sign Out</button>
      <button onClick={get_order}>Get Order</button>
      <button onClick={search_order}>Search Order</button>
    </div>
  );
}

export default App;
