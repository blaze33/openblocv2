import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import mySaga from './modules/sagas'

export const history = createHistory()
const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  sagaMiddleware,
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)
console.log(store)

sagaMiddleware.run(mySaga)
window.store = store

export const action = type => store.dispatch({type})

export default store

// load initial data anyway
action('POSTS_FETCH_REQUESTED')
