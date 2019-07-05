import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '@/store/reducers'

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)))
)

export default store
