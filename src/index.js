import React from 'react'
import ReactDOM from 'react-dom'
import 'material-design-icons-iconfont'
import './index.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import { App } from '@/containers/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'
import store, { history } from '@/store'

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
