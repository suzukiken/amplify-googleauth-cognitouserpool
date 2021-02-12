import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@material-ui/core'

function Loading(props) {
  
  const [ret, setRet] = useState('')
  
  useEffect(() => {
    if (props.loading) {
      setRet(<LinearProgress />)
    } else {
      setRet('')
    }
  }, [props.loading])

  return (ret)
}

export default Loading
