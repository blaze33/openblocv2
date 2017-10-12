import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../containers/home'
import Banner from '../containers/banner'

const basename = process.env.PUBLIC_URL

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path={`${basename}/`} component={Banner} />
        <Route exact path={`${basename}/home`} component={Home} />
      </div>
    )
  }
}

export default App
