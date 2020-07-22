import { createErrorMessage } from '../utils'

export default (values = {}) => {
  let errors = {}
  if (!values.title) {
    errors.title = {
      type: 'required',
      text: 'Title'
    }
  }
  if (!values.firstName) {
    errors.firstName = {
      type: 'required',
      text: 'First Name'
    }
  }
  if (!values.lastName) {
    errors.lastName = {
      type: 'required',
      text: 'Last Name'
    }
  }
  if (!values.birthday) {
    errors.birthday = {
      type: 'required',
      text: 'Birthday'
    }
  }
  if (!values.mobilePhone.countryCode || !values.mobilePhone.number) {
    errors.mobilePhone = {
      type: 'required',
      text: 'Mobile Phone'
    }
  }
  if (!values.expectedSalary) {
    errors.expectedSalary = {
      type: 'required',
      text: 'Expected Salary'
    }
  }
  if (_.size(errors)) {
    errors.message = createErrorMessage(errors)
  }
  return errors
}
