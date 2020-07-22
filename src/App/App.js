import React, {
  useState,
  useEffect,
  useRef,
  useMemo
} from 'react'
import _ from 'lodash'
import cns from 'classnames'
import Checkbox from '../components/forms/Checkbox'
import Pagination from '../components/Pagination'
import DeleteUserModal from './DeleteUserModal'
import UserModal from './UserModal'
import useModal from './useModal'
import { createClassName } from './utils'
import { ACTION_TYPES } from './constants'
import './App.scss'

const columns = [
  {
    columnId: 'name',
    headText: 'Name',
  },
  {
    columnId: 'gender',
    headText: 'Gender',
  },
  {
    columnId: 'mobilePhone',
    headText: 'Mobile Phone',
  },
  {
    columnId: 'nationality',
    headText: 'Nationality',
  }
]

function App(props) {
  const { users } = props
  const [userDataTable, setUserDataTable] = useState([])
  const [selected, setSelected] = useState([])
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 10,
  })
  const [formType, setFormType] = useState()
  const [editUserId, setEditUserId] = useState()
  const userModalController = useModal()
  const deleteUserModalController = useModal()
  const [deleteUserModal, setDeleteUserModal] = useState({
    userIds: null,
    callback: null,
  })
  const rowIds = useMemo(() => Object.keys(users), [users])
  const prevUsers = useRef(users)

  useEffect(() => {
    if (!_.isEqual(prevUsers.current, users)) {
      localStorage.setItem('users', JSON.stringify(users))
    }
    prevUsers.current = users
  }, [users])

  useEffect(() => {
    function createUserDataTable() {
      let produce = []
      for (const userId in users) {
        let user = users[userId]
        produce.push({
          userId,
          rowId: userId,
          gender: user.gender,
          nationality: user.nationality,
          mobilePhone: `${user.mobilePhone.countryCode}${user.mobilePhone.number}`,
          name: `${user.firstName} ${user.lastName}`,
        })
      }
      return produce
    }
    setUserDataTable(createUserDataTable())
  }, [users])

  function injectUserDataTable() {
    return userDataTable.slice(
      pageOptions.pageNumber - 1,
      pageOptions.pageSize * pageOptions.pageNumber
    )
  }

  function onSelectRowAll(checked) {
    if (checked) {
      setSelected(rowIds)
    } else {
      setSelected([])
    }
  }

  function onSelectRow(rowId, checked) {
    if (!isSelected(rowId) && checked) {
      setSelected([...selected, rowId])
    } else if (isSelected(rowId)) {
      setSelected(selected.filter(item => item !== rowId))
    }
  }

  function isSelected(rowId) {
    return selected.indexOf(rowId) !== -1
  }

  function onAddUser() {
    setFormType(ACTION_TYPES.add)
    userModalController.open()
  }

  function onEditUser(userId) {
    setFormType(ACTION_TYPES.edit)
    setEditUserId(userId)
    userModalController.open()
  }

  function clearSelectedBy(userIds = []) {
    setSelected(selected.filter(item => !userIds.includes(item)))
  }

  function onDeleteUsers(userIds) {
    setDeleteUserModal({
      userIds,
      callback: () => {
        clearSelectedBy(userIds)
        deleteUserModalController.close()
      }
    })
    deleteUserModalController.open()
  }

  function onUpdateUser(userdata = {}) {
    if (formType === ACTION_TYPES.add) {
      props.addUser(userdata)
    } else {
      props.editUser(editUserId, userdata)
    }
    userModalController.close()
  }

  function onChangePage(pageNumber, pageSize) {
    setPageOptions({ pageNumber, pageSize })
  }

  const haveSeleted = !!selected.length
  const haveDataTable = !!userDataTable.length

  return (
    <div className="user-management">
      <div className="user-table">
        <div className="user-table-header">
          <div className="user-table-header-title">
            <div className="user-table-header-title-text">User List</div>
          </div>
          <div className="user-table-header-nav">
            <Pagination
              totalItems={userDataTable.length}
              onChange={onChangePage}
            />
            <div
              onClick={onAddUser}
              className="user-table-add-user-button"
            >
              Add User
            </div>
          </div>
        </div>
        {haveSeleted && (
          <div className="user-table-selected">
            <div className="user-table-selected-title">{selected.length} Selected</div>
            <div
              onClick={() => onDeleteUsers(selected)}
              className="user-table-selected-delete-button"
            />
          </div>
        )}
        <div className="user-table-table-list">
          <div className="user-table-table-list-head">
            <div className="user-table-table-list-row">
              <div className="user-table-table-list-column row-select-all">
                <div className="user-table-table-list-column-value">
                  <Checkbox
                    name="rowSelectAll"
                    readOnly={!haveDataTable}
                    value={haveSeleted && selected.length === userDataTable.length}
                    onChange={(_, checked) => onSelectRowAll(checked)}
                  />
                </div>
              </div>
              {columns.map(({ columnId, headText }) => (
                <div
                  key={columnId}
                  className={cns(
                    'user-table-table-list-column',
                    createClassName(columnId)
                  )}
                >
                  {headText}
                </div>
              ))}
              <div className="user-table-table-list-column actions" />
            </div>
          </div>
          <div className="user-table-table-list-body">
            {!haveDataTable
              ? <div className="user-table-table-list-no-data" />
              : injectUserDataTable().map(({ rowId, userId, ...rest }) => (
                <div key={rowId} className="user-table-table-list-row">
                  <div className="user-table-table-list-column row-select">
                    <div className="user-table-table-list-column-value">
                      <Checkbox
                        name={`${rowId}.rowSelect`}
                        value={isSelected(rowId)}
                        onChange={(_, checked) => onSelectRow(rowId, checked)}
                      />
                    </div>
                  </div>
                  {columns.map(({ columnId }) => (
                    <div
                      key={columnId}
                      className={cns(
                        'user-table-table-list-column',
                        createClassName(columnId)
                      )}
                    >
                      <div className="user-table-table-list-column-value">
                        {rest[columnId]}
                      </div>
                    </div>
                  ))}
                  <div className="user-table-table-list-column actions">
                    <div className="user-table-table-list-column-value">
                      <div
                        onClick={() => onEditUser(userId)}
                        className="user-table-table-list-edit-button"
                      />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <UserModal
        isOpen={userModalController.isOpen}
        formType={formType}
        userData={users[editUserId]}
        onClose={userModalController.close}
        onConfirm={onUpdateUser}
      />
      <DeleteUserModal
        isOpen={deleteUserModalController.isOpen}
        onClose={deleteUserModalController.close}
        onConfirm={() => {
          props.deleteUsers(deleteUserModal.userIds)
          deleteUserModal.callback()
        }}
      />
    </div>
  )
}

export default App
