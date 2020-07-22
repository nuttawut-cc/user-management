import React, {
  useState,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import cns from 'classnames'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './DatePicker.scss'

function DatePicker(props) {
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
  const [focused, setFocused] = useState(null)
  const _label = !ignoreLabel ? (label || placeholder) : ''

  function onDateChange(_moment) {
    if (onChange && name) {
      onChange(name, _moment.valueOf())
    }
  }

  function onFocusChange({ focused }) {
    setFocused(focused)
  }

  return (
    <div className={cns(
      'date-picker',
      {
        'is-required': required,
        'is-focused': focused,
        'is-error': error
      }
    )}>
      {_label && <div className="date-picker-label">{_label}</div>}
      <SingleDatePicker
        readOnly
        hideKeyboardShortcutsPanel
        id={name}
        numberOfMonths={1}
        focused={focused}
        disabled={readOnly}
        displayFormat="MM/DD/YYYY"
        date={value ? moment(value) : null}
        placeholder={placeholder || ''}
        screenReaderInputMessage=" "
        openDirection="down"
        onDateChange={onDateChange}
        onFocusChange={onFocusChange}
        isOutsideRange={() => false}
        transitionDuration={0}
        daySize={40}
        {..._.omit(rest, ['children'])}
      />
    </div>
  )
}

DatePicker.propTypes = {
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
  onChange: PropTypes.func,
  value: PropTypes.node,
}

DatePicker.defaultProps = {
  name: '',
  label: '',
  error: '',
  placeholder: '',
  required: false,
  readOnly: false,
  ignoreLabel: false,
  onChange: null,
  value: null,
}

export default DatePicker
