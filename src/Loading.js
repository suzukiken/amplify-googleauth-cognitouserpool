import React from 'react'
import { LinearProgress } from '@material-ui/core'


class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let ret;
    if (this.props.loading) {
      ret = <LinearProgress />
    }
    else {
      ret = ''
    }
    return (
      ret
    )
  }
}

export default Loading;
