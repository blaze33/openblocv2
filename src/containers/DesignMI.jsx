import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import logo from '../images/logo.png'

class Home extends Component {
  render () {
    return (
      <div className='IM'>
        <div style={{textAlign: 'center', margin: '2em'}}>
          <img alt='logo' src={logo} width={80} />
          <p style={{fontSize: '1.4rem'}}>MAXIME ROUYRRE</p>
        </div>
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            height: '100vh',
            top: 0,
            left: 0,
            position: 'fixed',
            textAlign: 'center',
            fontFamily: 'Ubuntu, arial'}}
        >
          <div
            style={{
              position: 'absolute',
              margin: 'auto',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              WebkitTextStroke: '2px Black',
              color: 'transparent',
              fontSize: '5em'
            }}
          >
            LET'S CODE THINGS
          </div>
        </div>
        <div className='pure-g' style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', fontSize: '3rem'}}>
          <div className='pure-u-1-3' style={{margin: '2em 0em'}}>ABOUT ME</div>
          <div className='pure-u-1-3' style={{margin: '2em 0em'}}>BLOG</div>
          <div className='pure-u-1-3' style={{margin: '2em 0em'}}>CONTACT</div>
        </div>
      </div>
    )
  }
}

export default sizeMe()(Home)
