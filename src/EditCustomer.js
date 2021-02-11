import React from 'react'
import { Container, Grid, Button, TextField } from '@material-ui/core'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail } from './graphql/queries'
import { updateOrder } from './graphql/mutations'

class EditCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.update_order = this.update_order.bind(this)
    this.nameChanged = this.nameChanged.bind(this)
    this.prefectureChanged = this.prefectureChanged.bind(this)
    this.mailChanged = this.mailChanged.bind(this)
    this.state = {
      order_id: 1,
      order: {
        id: '',
        updated: '',
        detail: {
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
    }
  }

  async componentDidMount() {
    try {
      const query_response = await API.graphql(graphqlOperation(getOrderDetail, { id: this.state.order_id }))
      console.log(query_response.data)
      this.setState({
        order: query_response.data.getOrder
      })
    }
    catch (err) { console.log('error get order') }
  }

  async update_order(e) {
    e.preventDefault()
    try {
      const query_response = await API.graphql(graphqlOperation(updateOrder, { input: this.state.order }))
      console.log(query_response.data)
      this.setState({
        order: query_response.data.updateOrder
      })
    }
    catch (err) { console.log('error update order') }
  }

  nameChanged(e) {
    let order = this.state.order;
    order.detail.customer.name = e.target.value
    this.setState({
      order: order
    })
  }

  prefectureChanged(e) {
    let order = this.state.order;
    order.detail.customer.prefecture = e.target.value
    this.setState({
      order: order
    })
  }

  mailChanged(e) {
    let order = this.state.order;
    order.detail.customer.customer = e.target.value
    this.setState({
      order: order
    })
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.grid}>
            <form noValidate autoComplete="off" onSubmit={this.update_order}>
              <TextField size="small" label="name" variant="outlined" onChange={this.nameChanged} value={this.state.order.detail.customer.name} style={styles.textfield} />
              <TextField size="small" label="prefecture" variant="outlined" onChange={this.prefectureChanged} value={this.state.order.detail.customer.prefecture} style={styles.textfield} />
              <TextField size="small" label="mail" variant="outlined" onChange={this.mailChanged} value={this.state.order.detail.customer.mail} style={styles.textfield} />
              <Button variant="contained" color="primary" type="submit" style={styles.button}>Save</Button>
            </form>
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

export default EditCustomer
