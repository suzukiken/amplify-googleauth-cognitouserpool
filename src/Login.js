import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

function Login() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(function(user) {
        // ページを開いた時点でログインしている
        // 或いはログインした
        setUsername(user.username)
      })
      .catch(function() {
        // ページを開いた時点でログアウトしている
        // 或いはログアウトした
        setUsername(null)
      })
  })

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

  if (username) {
    return (
      <div>
        {username}
        <Button color="inherit" onClick={sign_out}>Logout</Button>
      </div>
    )
  }
  else {
    return (
      <div>
        <Button color="inherit" onClick={sign_in}>Login</Button>
      </div>
    )
  }
}

export default Login
