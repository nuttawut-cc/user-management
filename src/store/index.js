import { configureStore } from '@reduxjs/toolkit'
import usersModule from './modules/users'

export default configureStore({
  reducer: {
    users: usersModule.reducer
  }
})
