import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../store'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/home'
import Banner from '../containers/banner'
import NoMatch from '../containers/404'

const basename = process.env.PUBLIC_URL

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={`${basename}/`} component={Banner} />
            <Route strict path={`${basename}/home/`} component={Home} />
            <Route status={404} component={NoMatch} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
