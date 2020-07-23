import {
  createAction,
  createReducer
} from '@reduxjs/toolkit'
import moment from 'moment'
import shortId from 'short-uuid'

const addUser = createAction('ADD_USER')
const editUser = createAction('EDIT_USER')
const deleteUsers = createAction('DELETE_USERS')

const mockUserId = shortId.generate()
const mockUserData = {
  [mockUserId]: {
    userId: mockUserId,
    title: 'Mr.',
    firstName: 'Nuttawut',
    lastName: 'Chaichuay',
    nationality: 'Thai',
    gender: 'Male',
    birthday: moment('1991-06-06T00:00:00').valueOf(),
    citizenId: null,
    mobilePhone: {
      countryCode: '+66',
      number: '618815537',
    },
    passportNo: '',
    expectedSalary: ''
  }
}

const usersStorageData = JSON.parse(localStorage.getItem('users'))

const reducer = createReducer({
  userData: usersStorageData ? usersStorageData : mockUserData
}, {
  [addUser]: (state, action) => {
    const newUserId = shortId.generate()
    state.userData[newUserId] = action.payload
    state.userData[newUserId]['userId'] = newUserId
  },
  [editUser]: (state, action) => {
    if (action.payload.userId) {
      state.userData[action.payload.userId] = {
        ...state.userData[action.payload.userId],
        ...action.payload.userData
      }
    }
  },
  [deleteUsers]: (state, action) => {
    for (let i = 0; i < action.payload.length; i++) {
      delete state.userData[action.payload[i]]
    }
  }
})

const actions = {
  addUser: userData => addUser(userData),
  editUser: (userId, userData) => editUser({ userId, userData }),
  deleteUsers: (userIds = []) => deleteUsers(userIds),
}

export default {
  actions,
  reducer
}
