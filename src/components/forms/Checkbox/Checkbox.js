import React from 'react'
import PropTypes from 'prop-types'
import './Checkbox.scss'

function Checkbox(props) {
  const {
    name,
    value,
    readOnly,
    onChange,
    ...rest
  } = props
  const _value = Boolean(value)

  function _onChange(event) {
    if (onChange && name) {
      onChange(name, event.target.checked)
      event.target.checked = false
    }
  }

  return (
    <div className="checkbox">
      <input
        name={name}
        value={_value}
        type="checkbox"
        readOnly={readOnly}
        disabled={readOnly}
        onChange={_onChange}
        checked={_value}
        {...rest}
      />
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])
}

Checkbox.defaultProps = {
  name: '',
  onChange: null,
  readOnly: false,
  value: false
}

export default Checkbox
