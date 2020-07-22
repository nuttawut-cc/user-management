import React, {
  Fragment
} from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import BasicModal from '../components/BasicModal'

function DeleteUserModal(props) {
  const {
    isLoading,
    onConfirm,
    onClose,
    ...rest
  } = props

  function _onClose() {
    return !isLoading ? onClose() : undefined
  }

  function _onConfirm() {
    return !isLoading ? onConfirm() : undefined
  }

  return (
    <BasicModal
      {...rest}
      onClose={_onClose}
      body="Are you sure you want to delete selected item ?"
      shouldCloseOnOverlayClick={!isLoading}
      className={cns(
        'delete-user-modal',
        { 'is-loading': isLoading }
      )}
      footer={
        <Fragment>
          <div
            onClick={_onClose}
            className="delete-user-modal-cancel-button"
          >
            Cancel
          </div>
          <div
            onClick={_onConfirm}
            className="delete-user-modal-delete-button"
          />
        </Fragment>
      }
    />
  )
}

DeleteUserModal.propTypes = {
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

DeleteUserModal.defaultProps = {
  isLoading: false,
  onConfirm: () => { },
  onClose: () => { }
}

export default DeleteUserModal
