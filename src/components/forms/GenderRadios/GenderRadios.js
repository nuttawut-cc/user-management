import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import './GenderRadios.scss'

const GENDER = {
  male: 'Male',
  female: 'Female',
  unisex: 'Unisex'
}

function GenderRadios(props) {
  const {
    name,
    value,
    label,
    error,
    required,
    placeholder,
    ignoreLabel,
    readOnly,
    onChange,
  } = props
  const _label = !ignoreLabel ? (label || placeholder) : ''

  function _onChange(event) {
    if (onChange && name) {
      onChange(name, event.target.value)
    }
  }

  return (
    <div className={cns(
      'gender',
      {
        'is-required': required,
        'is-error': error
      }
    )}>
      {_label && <div className="gender-label">{_label}</div>}
      <div className="gender-inputs">
        <div className="gender-input">
          <input
            name={name}
            value={GENDER.male}
            onChange={_onChange}
            checked={value === GENDER.male}
            readOnly={readOnly}
            disabled={readOnly}
            type="radio"
          />
          <div className="gender-input-checked" />
          <div className="gender-input-label">Male</div>
        </div>
        <div className="gender-input">
          <input
            name={name}
            value={GENDER.female}
            onChange={_onChange}
            checked={value === GENDER.female}
            readOnly={readOnly}
            disabled={readOnly}
            type="radio"
          />
          <div className="gender-input-checked" />
          <div className="gender-input-label">Female</div>
        </div>
        <div className="gender-input">
          <input
            name={name}
            value={GENDER.unisex}
            onChange={_onChange}
            checked={value === GENDER.unisex}
            readOnly={readOnly}
            disabled={readOnly}
            type="radio"
          />
          <div className="gender-input-checked" />
          <div className="gender-input-label">Unisex</div>
        </div>
      </div>
    </div>
  )
}

GenderRadios.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
}

GenderRadios.defaultProps = {
  name: '',
  value: '',
  error: '',
  onChange: null,
  readOnly: false,
  required: false,
}

export default GenderRadios
