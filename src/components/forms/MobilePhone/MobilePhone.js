import React from 'react'
import PropTypes from 'prop-types'
import { components } from 'react-select'
import cns from 'classnames'
import Input from '../Input'
import Select from '../Select'
import './MobilePhone.scss'

const countryCodeOptions = [
  {
    value: '+66',
    label: '+66',
  }
]

function CustomSingleValue(props) {
  const {
    value,
    label
  } = props.data || {}

  return (
    <components.SingleValue {...props}>
      {/* Fixed thai country code with icon */}
      {value === countryCodeOptions[0].value && <span className="single-value-icon thai-flag-icon" />}
      <span className="label-text">{label}</span>
    </components.SingleValue>
  )
}

function MobilePhone(props) {
  const {
    name,
    value,
    readOnly,
    onChange,
    options,
    label,
    error,
    required,
    ignoreLabel,
    numberPlaceholder,
    countryCodePlaceholder,
  } = props
  const _label = !ignoreLabel && label
  const _options = options ? options : countryCodeOptions

  function _onChange(_name, _value) {
    if (onChange && name) {
      if (_name === 'number' && _value && !_value.match(/\d/g)) return
      onChange(name, {
        ...value,
        [_name]: _value
      })
    }
  }

  return (
    <div className={cns(
      'mobile-phone',
      {
        'is-required': required,
        'is-error': error
      }
    )}>
      {_label && <div className="mobile-phone-label">{_label}</div>}
      <div className="mobile-phone-inputs">
        <Select
          ignoreLabel
          name="countryCode"
          readOnly={readOnly}
          value={value.countryCode}
          components={{ SingleValue: CustomSingleValue }}
          placeholder={countryCodePlaceholder}
          onChange={_onChange}
          options={_options}
        />
        <Input
          ignoreLabel
          name="number"
          readOnly={readOnly}
          value={value.number}
          placeholder={numberPlaceholder}
          onChange={_onChange}
          maxLength={9}
        />
      </div>
    </div>
  )
}

MobilePhone.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  value: PropTypes.object,
  options: PropTypes.array,
  countryCodePlaceholder: PropTypes.string,
  numberPlaceholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  ignoreLabel: PropTypes.bool,
  onChange: PropTypes.func
}

MobilePhone.defaultProps = {
  name: '',
  label: '',
  error: '',
  countryCodePlaceholder: '',
  numberPlaceholder: '',
  value: {},
  options: null,
  readOnly: false,
  required: false,
  ignoreLabel: false,
  onChange: null
}

export default MobilePhone
