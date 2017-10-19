import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/home'
import Banner from '../containers/banner'
import NoMatch from '../containers/404'

const basename = process.env.PUBLIC_URL

class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path={`${basename}/`} component={Banner} />
        <Route exact path={`${basename}/home`} component={Home} />
        <Route status={404} component={NoMatch} />
      </Switch>
    )
  }
}

export default App