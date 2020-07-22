import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import './Input.scss'

function Input(props) {
  const {
    name,
    value,
    readOnly,
    onChange,
    label,
    error,
    required,
    ignoreLabel,
    placeholder,
    ...rest
  } = props
  const _label = !ignoreLabel ? (label || placeholder) : ''

  function _onChange(event) {
    if (onChange && name) {
      onChange(name, event.target.value)
    }
  }

  return (
    <div className={cns(
      'input',
      {
        'is-required': required,
        'is-error': error
      }
    )}>
      {_label && <div className="input-label">{_label}</div>}
      <input
        name={name}
        value={value || ''}
        placeholder={placeholder || ''}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={_onChange}
        {...rest}
      />
    </div >
  )
}

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  ignoreLabel: PropTypes.bool,
  onChange: PropTypes.func
}

Input.defaultProps = {
  name: '',
  value: '',
  label: '',
  error: '',
  placeholder: '',
  readOnly: false,
  required: false,
  ignoreLabel: false,
  onChange: null
}

export default Input
