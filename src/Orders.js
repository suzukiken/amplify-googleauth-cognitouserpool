import React, { useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail, searchOrder } from './graphql/queries'
import { Button, TextField, Container, Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import Loading from './Loading'

function Orders(props) {
  const [order_id, setOrderId] = useState(1)
  const [search_pref, setSearchPref] = useState('県')
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)

  function orderIdChanged(e) {
    setOrderId(e.target.value)
  }

  function prefChanged(e) {
    setSearchPref(e.target.value)
  }

  async function get_order(e) {
    e.preventDefault()
    try {
      const query_response = await API.graphql(graphqlOperation(getOrderDetail, { id: order_id }))
      console.log(query_response.data)
      setRows([
        {
          id: query_response.data.getOrder.id,
          updated: query_response.data.getOrder.updated
        }  
      ])
      let columns = [
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
              href={`/order/${order_id}/`}
            >
              Edit
            </Button>
          )
        }
      ]
      setColumns(columns)
    }
    catch (err) { console.log('error get order') }
  }

  async function search_order(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const query_response = await API.graphql(graphqlOperation(searchOrder, { prefecture: search_pref }))
      console.log(query_response.data)
      setLoading(false)
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
      setRows(rows)
      setColumns(columns)
    }
    catch (err) { console.log('error search order') }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} style={styles.grid}>
            <form noValidate autoComplete="off" onSubmit={get_order}>
              <TextField size="small" label="Number" variant="outlined" type="number" onChange={orderIdChanged} value={order_id} style={styles.textfield} />
              <Button variant="contained" color="primary" type="submit" style={styles.button}>Get Order</Button>
            </form>
        </Grid>
        <Grid item xs={12} style={styles.grid}>
            <form noValidate autoComplete="off" onSubmit={search_order}>
              <TextField size="small" label="Search string" variant="outlined" onChange={prefChanged} value={search_pref} style={styles.textfield} />
              <Button variant="contained" color="primary" type="submit" style={styles.button}>Search Order</Button>
            </form>
        </Grid>
        <Grid item xs={12} style={styles.grid}>
          <Loading loading={loading} />
          <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
        </Grid>
      </Grid>
    </Container>
  )
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
