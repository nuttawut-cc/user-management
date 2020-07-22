import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setAppElement } from 'react-modal'
import store from './store'
import App from './App'

const appElement = document.getElementById('app')
setAppElement(appElement)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appElement
)
