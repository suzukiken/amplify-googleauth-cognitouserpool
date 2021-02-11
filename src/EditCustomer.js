import React from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail } from './graphql/queries'

class EditCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order_id: 1,
      customer: {
        mail: '',
        name: '',
        prefecture: ''
      }
    }
  }

  async componentDidMount() {
    try {
      const query_response = await API.graphql(graphqlOperation(getOrderDetail, { id: this.state.order_id }))
      console.log(query_response.data)
      this.setState({
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
            <Button variant="contained" color="primary" type="submit" style={styles.button}>Edit customer</Button>
          </Grid>
          <Grid item xs={12} style={styles.grid}>
            <p>{this.state.customer.name}</p>
            <p>{this.state.customer.prefecture}</p>
            <p>{this.state.customer.mail}</p>
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
