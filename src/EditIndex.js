import React from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail } from './graphql/queries'

class EditIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order_id: 1,
      customer: {
        mail: '',
        name: '',
        prefecture: ''
      },
      item: {
        rows: [],
        columns: []
      },
      payment: {
        rows: [],
        columns: []
      }
    }
  }

  async componentDidMount() {
    try {
      const query_response = await API.graphql(graphqlOperation(getOrderDetail, { id: this.state.order_id }))
      console.log(query_response.data)
      let item_rows = query_response.data.getOrder.detail.items
      for (let i in item_rows) {
        item_rows[i].id = parseInt(i)
      }
      let item_columns = [
        { field: 'sku', headerName: 'sku', width: 150 },
        { field: 'pcs', headerName: 'pcs', width: 150 }
      ]
      let payment_rows = query_response.data.getOrder.detail.payment
      for (let i in payment_rows) {
        payment_rows[i].id = parseInt(i)
      }
      let payment_columns = [
        { field: 'type', headerName: 'type', width: 150 },
        { field: 'amount', headerName: 'amount', width: 150 }
      ]
      this.setState({
        item: {
          rows: item_rows,
          columns: item_columns
        },
        payment: {
          rows: payment_rows,
          columns: payment_columns
        },
        customer: {
          mail: query_response.data.getOrder.detail.customer.mail,
          name: query_response.data.getOrder.detail.customer.name,
          prefecture: query_response.data.getOrder.detail.customer.prefecture
        }
      })
    }
    catch (err) { console.log('error get order') }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.grid}>
            <Button variant="contained" color="primary" type="submit" style={styles.button} href="/edit/customer/">Edit customer</Button>
            <Button variant="contained" color="primary" type="submit" style={styles.button}>Edit items</Button>
            <Button variant="contained" color="primary" type="submit" style={styles.button}>Edit payments</Button>
          </Grid>
          <Grid item xs={12} style={styles.grid}>
            <p>{this.state.customer.name}</p>
            <p>{this.state.customer.prefecture}</p>
            <p>{this.state.customer.mail}</p>
          </Grid>
          <Grid item xs={12} style={styles.grid}>
            <DataGrid rows={this.state.item.rows} columns={this.state.item.columns} pageSize={10} autoHeight />
          </Grid>
          <Grid item xs={12} style={styles.grid}>
            <DataGrid rows={this.state.payment.rows} columns={this.state.payment.columns} pageSize={10} autoHeight />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  grid: { padding: '12px' },
  button: { margin: '4px' },
  textfield: { margin: '4px' },
}

export default EditIndex
