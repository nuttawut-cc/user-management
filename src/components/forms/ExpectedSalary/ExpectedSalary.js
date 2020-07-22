import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import numeral from 'numeral'
import Input from '../Input'
import './ExpectedSalary.scss'

function ExpectedSalary(props) {
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
  } = props
  const _label = !ignoreLabel ? (label || placeholder) : ''

  function _onChange(_, value) {
    if (onChange && name && (!value || value.match(/\d/g))) {
      onChange(name, value)
    }
  }

  return (
    <div className={cns(
      'expected-salary',
      {
        'is-required': required,
        'is-error': error
      }
    )}>
      {_label && <div className="expected-salary-label">{_label}</div>}
      <div className="expected-salary-input">
        <Input
          ignoreLabel
          name={name}
          value={value ? numeral(value).format('0,0') : ''}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={_onChange}
        />
        <div className="expected-salary-input-unit">THB</div>
      </div>
    </div>
  )
}

ExpectedSalary.propTypes = {
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

ExpectedSalary.defaultProps = {
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

export default ExpectedSalary
