import { connect } from 'react-redux'
import usersModule from '../store/modules/users'
import App from './App'

const mapStateToProps = state => ({
  users: state.users.userData
})

const mapDispatchToProps = {
  addUser: usersModule.actions.addUser,
  editUser: usersModule.actions.editUser,
  deleteUsers: usersModule.actions.deleteUsers,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
