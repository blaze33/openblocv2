import React, { Component } from 'react'
import moment from 'moment'
import sizeMe from 'react-sizeme'
import Menu from '../components/menu/menu'
import { Link } from 'react-router-dom'

class NoMatch extends Component {
  render () {
    return (
      <div className='App'>
        <Menu className='AppHeader' />
        <div className='AppContent'>
          <div className='AppContent'>
            <section className='pure-g'>
              <div className='pure-u-1-24 pure-u-md-4-24' />
              <div className='pure-u-22-24 pure-u-md-16-24'>
                <div className='pure-g'>
                  <div className='pure-u-1'>
                    <h1>404</h1>
                    <p>This webpage address does not exist.</p>
                    <br />
                    <p>
                      <Link to={`${process.env.PUBLIC_URL}/`} className='expandButton'>Get back to the homepage</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className='pure-u-1-24 pure-u-md-4-24' />
            </section>
          </div>
        </div>
        <div className='AppFooter'>
          <small>Openbloc © 1983 - {moment().format('YYYY')}</small>
        </div>
      </div>
    )
  }
}

export default sizeMe()(NoMatch)
