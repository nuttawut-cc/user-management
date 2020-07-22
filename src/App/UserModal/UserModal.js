import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import BasicModal from '../../components/BasicModal'
import Pattern from './Pattern'
import { ACTION_TYPES } from '../constants'

function UserModal(props) {
  const {
    formType,
    userData,
    isLoading,
    onConfirm,
    onClose,
    ...rest
  } = props

  function _onClose() {
    return !isLoading ? onClose() : undefined
  }

  return (
    <BasicModal
      {...rest}
      onClose={_onClose}
      shouldCloseOnOverlayClick={!isLoading}
      title={
        <div className="user-modal-title-text">
          {formType === ACTION_TYPES.edit ? 'Edit User' : 'Add User'}
        </div>
      }
      className={cns(
        'user-modal',
        { 'is-loading': isLoading }
      )}
      body={
        <Pattern
          isLoading={isLoading}
          formType={formType}
          userData={userData}
          onConfirm={onConfirm}
        />
      }
    />
  )
}

UserModal.propTypes = {
  formType: PropTypes.string,
  isLoading: PropTypes.bool,
  userData: PropTypes.object,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

UserModal.defaultProps = {
  formType: '',
  isLoading: false,
  userData: {},
  onConfirm: () => { },
  onClose: () => { }
}

export default UserModal
