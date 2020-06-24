import { call, put, takeEvery } from 'redux-saga/effects'

class GhostAPI {
  constructor (props) {
    this.blogUrl = 'https://blog.openbloc.com'
    this.blogApiUrl = `${this.blogUrl}/ghost/api/v3/content`
    this.authData = `key=${process.env.GHOST_CONTENT_API_KEY}`
  }

  fetchPosts = () => {
    return window.fetch(
      `${this.blogApiUrl}/posts/?${this.authData}`,
      {mode: 'cors'}
    ).then(
      response => response.json()
    ).then(
      json => json.posts
    )
  }
}

const GhostAPIClient = new GhostAPI()

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function * fetchPosts (action) {
  try {
    const posts = yield call(GhostAPIClient.fetchPosts)
    yield put({type: 'POSTS_FETCH_SUCCEEDED', posts})
  } catch (e) {
    yield put({type: 'POSTS_FETCH_FAILED', message: e.message})
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function * mySaga () {
  yield takeEvery('POSTS_FETCH_REQUESTED', fetchPosts)
}

export default mySaga
