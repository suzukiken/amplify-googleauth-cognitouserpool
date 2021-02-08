import React from 'react' // useEffect
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify'
import { getOrder, searchOrder } from './graphql/queries'
import awsExports from "./aws-exports"
import { Button, TextField, Container, Grid, AppBar, Toolbar, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'


Amplify.configure(awsExports)

function App() {

  async function sign_in() {
    try {
      await Auth.federatedSignIn()
    }
    catch (err) {
      console.log('error signIn:', err)
    }
    finally {
      console.log('done signIn')
    }
  }

  async function sign_out() {
    try {
      await Auth.signOut()
    }
    catch (err) {
      console.log('error signOut:', err)
    }
    finally {
      console.log('done signOut')
    }
  }

  async function get_order() {
    try {
      const query_response = await API.graphql(graphqlOperation(getOrder, { id: 1 }))
      console.log(query_response.data)
    }
    catch (err) { console.log('error get order') }
  }

  async function search_order() {
    try {
      const query_response = await API.graphql(graphqlOperation(searchOrder, { prefecture: "県" }))
      console.log(query_response.data)
    }
    catch (err) { console.log('error search order') }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 }
  ]

  const lines = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }
  ]

  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Orders
            </Typography>
            <Button color="inherit" onClick={sign_in}>Login</Button>
            <Button color="inherit" onClick={sign_out}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.paper}>
              <form noValidate autoComplete="off">
                <TextField variant="outlined" label="Order ID" style={styles.textfield} />
                <Button variant="contained" color="primary" onClick={get_order} style={styles.button}>Get Order</Button>
              </form>
          </Grid>
          <Grid item xs={12} style={styles.paper}>
              <form noValidate autoComplete="off">
                <TextField variant="outlined" label="Search string in prefecture" style={styles.textfield} />
                <Button variant="contained" color="primary" onClick={search_order} style={styles.button}>Search Order</Button>
              </form>
          </Grid>
          <Grid item xs={12} style={styles.paper}>
            <DataGrid rows={lines} columns={columns} pageSize={10} autoHeight />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const styles = {
  header: { padding: '12px' },
  paper: { padding: '12px' },
  button: { margin: '4px' },
  textfield: { margin: '4px' }
}

export default App;
