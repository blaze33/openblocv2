import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const basename = process.env.PUBLIC_URL

class NoMatch extends Component {
  render () {
    return (
      <div className='IM pure-g'>
        <div className='header pure-u-1'>
          <Link to={`${basename}/home/`}>
            <img alt='logo' className='App-logo' src={logo}/>
            <p>MAXIME ROUYRRE</p>
          </Link>
        </div>
        <div className='content' style={{textAlign: 'center'}}>
          <h2>404</h2>
          <p>This webpage address does not exist</p>
          <p><Link to={`${basename}/`}>HOMEPAGE</Link></p>
        </div>
        <div className='links pure-g'>
          <div className='link pure-u-1-3'>
            <Link to={`${basename}/home/about`}>
              ABOUT ME
            </Link>
          </div>
          <div className='link pure-u-1-3'>
            <Link to={`${basename}/home/blog`}>
              BLOG
            </Link>
          </div>
          <div className='link pure-u-1-3'>
            <Link to={`${basename}/home/contact`}>
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NoMatch
