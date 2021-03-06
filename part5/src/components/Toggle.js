import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Toggle.propTypes = {
  buttonLable: PropTypes.string.isRequired
}

export default Toggle