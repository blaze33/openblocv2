import { call, put, takeEvery } from 'redux-saga/effects'

class GhostAPI {
  constructor (props) {
    this.blogUrl = 'https://blog.openbloc.fr'
    this.blogApiUrl = `${this.blogUrl}/ghost/api/v0.1`
    this.authData = 'client_id=ghost-frontend&client_secret=18e5b4ad1180'
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
