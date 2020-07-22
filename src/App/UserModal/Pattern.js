import React, {
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cns from 'classnames'
import {
  setValue,
  createClassName
} from '../utils'
import { ACTION_TYPES } from '../constants'
import {
  FIELDS,
  INITIAL_VALUES,
} from './constants'
import validate from './validate'

function Pattern(props) {
  const {
    formType,
    userData,
    isLoading,
    onConfirm,
  } = props
  const [form, setForm] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const [errors, setErrors] = useState(null)

  function initialForm() {
    const formValues = formType === ACTION_TYPES.add ? INITIAL_VALUES : userData
    setInitialValues(formValues)
    setForm(formValues)
  }

  useEffect(initialForm, [userData])
  useEffect(() => () => setErrors(null), [])

  function onResetForm(event) {
    event.preventDefault()
    setForm(initialValues)
    setErrors(null)
  }

  function onChangeForm(name, value) {
    const newForm = _.cloneDeep(form)
    setForm(setValue(newForm, name, value))
  }

  function onSubmitForm(event) {
    event.preventDefault()
    const _errors = validate(form)
    if (_.size(_errors)) return setErrors(_errors)
    if (!isLoading) onConfirm(form)
  }

  return (
    <form
      autoComplete="off"
      className="user-form"
      onReset={onResetForm}
      onSubmit={onSubmitForm}
    >
      <div className="user-form-body">
        {!!errors && <div className="user-form-errors-message">{errors.message}</div>}
        {FIELDS.map((items, idx) => (
          <div key={idx} className={cns('user-form-row', `row-${idx}`)}>
            {items.map(({ name, Component, ...rest }) => (
              <div
                key={name}
                className={cns(
                  'user-form-column',
                  createClassName(name)
                )}
              >
                <Component
                  name={name}
                  value={form[name]}
                  error={!!(errors || {})[name]}
                  onChange={onChangeForm}
                  {...rest}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="user-form-footer">
        <button type="reset" className="user-form-footer-reset-button">Reset</button>
        <button type="submit" className="user-form-footer-submit-button" />
      </div>
    </form>
  )
}

Pattern.propTypes = {
  formType: PropTypes.string,
  isLoading: PropTypes.bool,
  userData: PropTypes.object,
  onConfirm: PropTypes.func
}

Pattern.defaultProps = {
  formType: '',
  isLoading: false,
  userData: {},
  onConfirm: () => { }
}

export default Pattern
