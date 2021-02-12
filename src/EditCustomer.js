import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, TextField } from '@material-ui/core'
import { API, graphqlOperation } from 'aws-amplify'
import { getOrderDetail } from './graphql/queries'
import { updateOrder } from './graphql/mutations'
import { useParams } from "react-router-dom"

function EditCustomer() {
  
  const initialOrder = {
    id: '',
    updated: '',
    detail: {
      customer: {
        mail: '',
        name: '',
        prefecture: ''
      },
      items: {
        rows: [],
        columns: []
      },
      payment: {
        rows: [],
        columns: []
      }
    }
  }
  
  const [order, setOrder] = useState(initialOrder)
  
  // get id from url
  let { id } = useParams()
  
  useEffect(() => {
    async function fetchData() {
      try {
        const query_response = await API.graphql(graphqlOperation(getOrderDetail, { id: id }))
        console.log(query_response.data)
        setOrder(query_response.data.getOrder)
      }
      catch (err) { console.log('error get order') }
    }
    fetchData()
  }, [id])

  async function update_order(e) {
    e.preventDefault()
    try {
      const query_response = await API.graphql(graphqlOperation(updateOrder, { input: order }))
      console.log(query_response.data)
      setOrder(query_response.data.updateOrder)
    }
    catch (err) { console.log('error update order') }
  }
  
  function setName(e) {
    console.log(e)
    setOrder(prev => {
      console.log(prev)
      return {
        id: prev.id,
        updated: prev.updated,
        detail: {
          customer: {
            mail: prev.detail.customer.mail,
            name: e.target.value,
            prefecture: prev.detail.customer.prefecture
          },
          items: prev.detail.items,
          payment: prev.detail.payment
        }
      }
    })
  }
  
  function setPrefecture(e) {
    setOrder(prev => {
      console.log(prev)
      return {
        id: prev.id,
        updated: prev.updated,
        detail: {
          customer: {
            mail: prev.detail.customer.mail,
            name: prev.detail.customer.name,
            prefecture: e.target.value
          },
          items: prev.detail.items,
          payment: prev.detail.payment
        }
      }
    })
  }
  
  function setMail(e) {
    setOrder(prev => {
      console.log(prev)
      return {
        id: prev.id,
        updated: prev.updated,
        detail: {
          customer: {
            mail: e.target.value,
            name: prev.detail.customer.name,
            prefecture: prev.detail.customer.prefecture
          },
          items: prev.detail.items,
          payment: prev.detail.payment
        }
      }
    })
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} style={styles.grid}>
          <form noValidate autoComplete="off" onSubmit={update_order}>
            <TextField size="small" label="name" variant="outlined" onChange={setName} value={order.detail.customer.name} style={styles.textfield} />
            <TextField size="small" label="prefecture" variant="outlined" onChange={setPrefecture} value={order.detail.customer.prefecture} style={styles.textfield} />
            <TextField size="small" label="mail" variant="outlined" onChange={setMail} value={order.detail.customer.mail} style={styles.textfield} />
            <Button variant="contained" color="primary" type="submit" style={styles.button}>Save</Button>
          </form>
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

export default EditCustomer
