import React, { useState, useEffect } from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail } from './graphql/queries'
import { useParams } from "react-router-dom"

function Order() {
  
  const [order_id, setOrderId] = useState(1)
  const [customer, setCustomer] = useState({
    mail: '',
    name: '',
    prefecture: ''
  })
  const [items, setItems] = useState({
    rows: [],
    columns: []
  })
  const [payments, setPayments] = useState({
    rows: [],
    columns: []
  })
  
  let { id } = useParams()

  useEffect(() => {
    console.log('fetchData')
    setOrderId(id)
    async function fetchData() {
      try {
        const response = await API.graphql(graphqlOperation(getOrderDetail, { id: id }))
        console.log(response.data)
        response_to_items(response)
        response_to_payments(response)
        response_to_customer(response)
      }
      catch (err) {
        console.log('error get order')
      }
    }
    fetchData()
  }, [id]);
  
  function response_to_items(response) {
    console.log('response_to_items')
    // set items
    let items_rows = response.data.getOrder.detail.items
    for (let i in items_rows) {
      items_rows[i].id = parseInt(i) // add id for DataGrid
    }
    let items_columns = [
      { field: 'sku', headerName: 'sku', width: 150 },
      { field: 'pcs', headerName: 'pcs', width: 150 }
    ]
    setItems({
      rows: items_rows,
      columns: items_columns
    })
  }
  
  function response_to_payments(response) {
    console.log('response_to_payments')
    // set payments
    let payments_rows = response.data.getOrder.detail.payment
    for (let i in payments_rows) {
      payments_rows[i].id = parseInt(i) // add id for DataGrid
    }
    let payments_columns = [
      { field: 'type', headerName: 'type', width: 150 },
      { field: 'amount', headerName: 'amount', width: 150 }
    ]
    setPayments({
      rows: payments_rows,
      columns: payments_columns
    })
  }
  
  function response_to_customer(response) {
    console.log('response_to_customer')
    // set customer
    setCustomer({
      mail: response.data.getOrder.detail.customer.mail,
      name: response.data.getOrder.detail.customer.name,
      prefecture: response.data.getOrder.detail.customer.prefecture
    })
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} style={styles.grid}>
          
        </Grid>
        <Grid item xs={9} style={styles.grid}>
          <p>{customer.name}</p>
          <p>{customer.prefecture}</p>
          <p>{customer.mail}</p>
        </Grid>
        <Grid item xs={3} style={styles.grid}>
          <Button variant="contained" color="primary" type="submit" style={styles.button} href={`/order/${order_id}/edit/`}>Edit customer</Button>
        </Grid>
        <Grid item xs={12} style={styles.grid}>
          <DataGrid rows={items.rows} columns={items.columns} pageSize={10} autoHeight />
        </Grid>
        <Grid item xs={12} style={styles.grid}>
          <DataGrid rows={payments.rows} columns={payments.columns} pageSize={10} autoHeight />
        </Grid>
      </Grid>
    </Container>
  )
}

const styles = {
  grid: { padding: '12px' },
  button: { margin: '4px' },
  textfield: { margin: '4px' },
}

export default Order
