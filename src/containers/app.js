import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import sizeMe from 'react-sizeme'
import Home from '../containers/home'
import Banner from '../containers/banner'

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Banner} />
        <Route exact path='/home' component={Home} />
      </div>
    )
  }
}

export default sizeMe()(App)
