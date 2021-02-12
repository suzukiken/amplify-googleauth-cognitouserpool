import React from 'react'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'
import Login from './Login'

function Navi() {
  return (
    <AppBar position="static" style={styles.appbar}>
      <Toolbar>
        <Typography variant="h6" style={styles.title}>
          <Button href="/">Home</Button>
        </Typography>
        <Login />
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  title: { flexGrow: 1 },
  appbar: { marginBottom: '30px' }
}

export default Navi
