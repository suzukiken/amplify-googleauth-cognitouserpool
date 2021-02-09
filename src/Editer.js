import React from 'react'
import { Container, Grid } from '@material-ui/core'

class Editer extends React.Component {
  render() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} style={styles.grid}>
            Editer
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  grid: { padding: '12px' }
}

export default Editer
