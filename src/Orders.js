import React from 'react' // useEffect
import { API, graphqlOperation } from 'aws-amplify'
import { getOrder, searchOrder } from './graphql/queries'
import { Button, TextField, Container, Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import Loading from './Loading'

class Orders extends React.Component {
  constructor(props) {
    super(props)
    // setState を利用する関数はbind する。
    // これをしないとコードがキモくなる
    this.get_order = this.get_order.bind(this)
    this.search_order = this.search_order.bind(this)
    this.orderIdChanged = this.orderIdChanged.bind(this)
    this.prefChanged = this.prefChanged.bind(this)
    this.state = {
      order_id: 1,
      search_pref: '県',
      rows: [],
      columns: [],
      loading: false
    }
  }

  orderIdChanged(e) {
    this.setState({
      order_id: e.target.value
    })
  }

  prefChanged(e) {
    this.setState({
      search_pref: e.target.value
    })
  }

  async get_order(e) {
    e.preventDefault()
    try {
      const query_response = await API.graphql(graphqlOperation(getOrder, { id: this.state.order_id }))
      console.log(query_response.data)
      let rows = []
      rows.push(query_response.data.getOrder)
      this.setState({
        rows: rows,
        columns: [
          { field: 'id', headerName: 'ID' },
          { field: 'updated', headerName: 'Updated', width: 150 },
          {
            field: 'edit',
            headerName: 'Edit',
            renderCell: (params) => (
              <Button
                variant="contained"
                color="primary"
                size="small"
                href="/edit/"
              >
                Edit
              </Button>
            )
          }
        ]
      })
    }
    catch (err) { console.log('error get order') }
  }

  async search_order(e) {
    e.preventDefault()
    this.setState({
      loading: true
    })
    try {
      const query_response = await API.graphql(graphqlOperation(searchOrder, { prefecture: this.state.search_pref }))
      console.log(query_response.data)
      this.setState({
        loading: false
      })
      let rows = []
      let columns = []
      let cols = query_response.data.searchOrder.columns
      let ros = query_response.data.searchOrder.rows
      for (let i in cols) {
        columns.push({ field: cols[i].name, headerName: cols[i].name })
      }
      for (let i in ros) {
        let rdata = { id: i }
        for (let n = 0; n < ros[i].length; n++) {
          rdata[columns[n].field] = ros[i][n]
        }
        rows.push(rdata)
      }
      this.setState({
        rows: rows,
        columns: columns
      })
    }
    catch (err) { console.log('error search order') }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.grid}>
              <form noValidate autoComplete="off" onSubmit={this.get_order}>
                <TextField size="small" label="Number" variant="outlined" type="number" onChange={this.orderIdChanged} value={this.state.order_id} style={styles.textfield} />
                <Button variant="contained" color="primary" type="submit" style={styles.button}>Get Order</Button>
              </form>
          </Grid>
          <Grid item xs={12} style={styles.grid}>
              <form noValidate autoComplete="off" onSubmit={this.search_order}>
                <TextField size="small" label="Search string" variant="outlined" onChange={this.prefChanged} value={this.state.search_pref} style={styles.textfield} />
                <Button variant="contained" color="primary" type="submit" style={styles.button}>Search Order</Button>
              </form>
          </Grid>
          <Grid item xs={12} style={styles.grid}>
            <Loading loading={this.state.loading} />
            <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={10} autoHeight />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  title: { flexGrow: 1 },
  header: { padding: '12px' },
  grid: { padding: '12px' },
  button: { margin: '4px' },
  textfield: { margin: '4px' },
  appbar: { marginBottom: '30px' }
}

export default Orders
