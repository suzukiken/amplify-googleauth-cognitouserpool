import React from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(function(user) {
        // ページを開いた時点でログインしている
        // 或いはログインした
        this.setState({ username: user.username })
      }.bind(this))
      .catch(function() {
        // ページを開いた時点でログアウトしている
        // 或いはログアウトした
        this.setState({ username: null })
      }.bind(this))
  }

  async sign_in() {
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

  async sign_out() {
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

  render() {
    if (this.state.username) {
      return (
        <div>
          {this.state.username}
          <Button color="inherit" onClick={ this.sign_out }>Logout</Button>
        </div>
      )
    }
    else {
      return (
        <div>
          <Button color="inherit" onClick={ this.sign_in }>Login</Button>
        </div>
      )
    }
  }
}

export default Login
