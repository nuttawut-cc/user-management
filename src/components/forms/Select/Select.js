import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import cns from 'classnames'
import './Select.scss'

function Select(props) {
  const {
    name,
    value,
    options,
    onChange,
    label,
    error,
    readOnly,
    required,
    ignoreLabel,
    placeholder,
    ...rest
  } = props
  const _label = !ignoreLabel ? (label || placeholder) : ''

  function _onChange({ value }) {
    if (onChange && name) {
      onChange(name, value)
    }
  }

  function getValue() {
    return (options || []).find(option => option.value === value) || null
  }

  return (
    <div className={cns(
      'select',
      {
        'is-required': required,
        'is-error': error
      }
    )}>
      {_label && <div className="select-label">{_label}</div>}
      <ReactSelect
        name={name}
        value={getValue()}
        options={options}
        placeholder={placeholder || 'Select'}
        className="custom-select"
        classNamePrefix="custom-select"
        isSearchable={false}
        onChange={_onChange}
        {...rest}
      />
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  ignoreLabel: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.node
}

Select.defaultProps = {
  name: '',
  label: '',
  value: '',
  error: '',
  placeholder: '',
  required: false,
  readOnly: false,
  ignoreLabel: false,
  options: [],
  onChange: null
}

export default Select
