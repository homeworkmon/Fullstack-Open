import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notif)

  if (notif === null) {
    return null
  } else {
    const isError = notif.isError
    const message = notif.message
    if (isError) {
      return (
        <div className="error">
          <h2>{message}</h2>
        </div>
      )
    } else
      return (
        <div className="notif">
          <h2>{message}</h2>
        </div>
      )
  }
}

export default Notification