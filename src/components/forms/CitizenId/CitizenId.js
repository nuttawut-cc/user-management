import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import './CitizenId.scss'

function CitizenId(props) {
  const {
    name,
    value,
    readOnly,
    onChange,
    label,
    error,
    required,
    ignoreLabel,
    placeholder
  } = props
  const _label = !ignoreLabel && label
  const values = value ? value : new Array(5).fill('')
  const inputs = [1, 4, 5, 2, 1]

  function _onChange(event) {
    if (onChange && name && (!event.target.value || event.target.value.match(/\d/g))) {
      let nextValue = values.slice(0)
      let idx = event.target.name
      nextValue[idx] = event.target.value
      onChange(name, nextValue)
    }
    event.target.value = ''
  }

  return (
    <div className={cns(
      'citizen-id',
      {
        'is-error': error,
        'is-required': required
      }
    )}>
      {_label && <div className="citizen-id-label">{_label}</div>}
      <div className="citizen-id-inputs">
        {inputs.map((size, idx) => {
          return (
            <div
              key={idx}
              className={`citizen-id-input input-${idx}`}
            >
              <input
                type="text"
                name={idx}
                readOnly={readOnly}
                disabled={readOnly}
                value={values[idx] || ''}
                placeholder={placeholder[idx] || ''}
                onChange={_onChange}
                maxLength={size}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

CitizenId.propTypes = {
  name: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  ignoreLabel: PropTypes.bool,
  placeholder: PropTypes.array,
  onChange: PropTypes.func
}

CitizenId.defaultProps = {
  name: '',
  value: null,
  label: '',
  error: '',
  placeholder: [],
  required: false,
  readOnly: false,
  ignoreLabel: false,
  onChange: null
}

export default CitizenId
