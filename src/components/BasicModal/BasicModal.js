import React from 'react'
import PropTypes from 'prop-types'
import cns from 'classnames'
import Modal from 'react-modal'
import './BasicModal.scss'

function BasicModal(props) {
  const {
    body,
    buttonClassName,
    buttonText,
    className,
    footer,
    header,
    isDisabledClose,
    isButtonLoading,
    isOpen,
    onClickButton,
    onClose,
    title,
    ...rest
  } = props

  return (
    <Modal
      isOpen={isOpen}
      className={cns('basic-modal', className)}
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      closeTimeoutMS={400}
      {...rest}
    >
      {!isDisabledClose && <div className="basic-modal-close-button" onClick={onClose} />}
      <div className="basic-modal-header">
        {!header
          ? <div className="basic-modal-title">{title}</div>
          : header
        }
      </div>
      <div className="basic-modal-body">{body}</div>
      <div className="basic-modal-footer">
        {!footer
          ? (
            <div
              onClick={!isButtonLoading ? onClickButton : undefined}
              className={cns(
                'basic-modal-button',
                buttonClassName,
                { 'is-loading': isButtonLoading }
              )}
            >
              {buttonText && buttonText}
            </div>
          )
          : footer
        }
      </div>
    </Modal>
  )
}

BasicModal.propTypes = {
  isOpen: PropTypes.bool,
  isDisabledClose: PropTypes.bool,
  isButtonLoading: PropTypes.bool,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonText: PropTypes.node,
  title: PropTypes.node,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  onClickButton: PropTypes.func
}

BasicModal.defaultProps = {
  isOpen: false,
  isDisabledClose: false,
  isButtonLoading: false,
  className: '',
  title: null,
  header: null,
  body: null,
  footer: null,
  buttonText: null,
  buttonClassName: '',
  onClickButton: () => { },
  onClose: () => { }
}

export default BasicModal
