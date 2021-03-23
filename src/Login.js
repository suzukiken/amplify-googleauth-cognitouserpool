import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'

function Login() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(function(user) {
        // ページを開いた時点でログインしている
        // 或いはログインした
        console.log('loggingIn')
        setUsername(user.name)
      })
      .catch(function() {
        // ページを開いた時点でログアウトしている
        // 或いはログアウトした
        console.log('not loggingIn')
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
        <button onClick={sign_out}>Logout</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <button onClick={sign_in}>Login</button>
      </div>
    )
  }
}

export default Login
