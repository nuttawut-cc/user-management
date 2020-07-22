import _ from 'lodash'

export function createClassName(str = '') {
  return str.replace(/([A-Z0-9])/g, '-$1').toLowerCase()
}

export function setValue(data = {}, name = '', value) {
  let produce = {}
  let path = name ? name.split('.') : []
  if (!!path.length) {
    produce[path[path.length - 1]] = value
    let next = path.slice(0, path.length - 1).join('.')
    let oldValue = _.get(data, next)
    return path.length === 1
      ? Object.assign(data, produce)
      : setValue(data, next, Object.assign(oldValue, produce))
  }
  return data
}

export function createErrorMessage(errors = {}) {
  const obj = {}
  _.forEach(errors, item => {
    obj[item.type] = obj[item.type] ? `${obj[item.type]}, ${item.text}` : item.text
  })
  if (obj.required) {
    const verb = obj.required.split(',').length > 1 ? 'are' : 'is'
    obj.required = `${obj.required} ${verb} required.`
  }
  return _.map(obj, text => text).join(' | ')
}
