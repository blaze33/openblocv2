import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const defaultState = {posts: [], ready: false, fetching: false}
function blogReducer(state = defaultState, action) {
  switch (action.type) {
    case 'POSTS_FETCH_REQUESTED':
      state.fetching = true
      return state
    case 'POSTS_FETCH_SUCCEEDED':
      state = {posts: action.posts, ready: true, fetching: false}
      return state
    case 'POSTS_FETCH_FAILED':
      state.fetching = false
      return state
    default:
      return state
  }
}
export default combineReducers({
  blog: blogReducer,
  routing: routerReducer
})
