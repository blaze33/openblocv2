import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { Switch, Route } from 'react-router-dom'
import BlogList from '../components/menu/blogList'

const basename = process.env.PUBLIC_URL

class Home extends Component {
  render () {
    return (
      <div className='IM pure-g'>
        <div className='header pure-u-1'>
          <Link to={`${basename}/design-mi/`}>
            <img alt='logo' className='App-logo' src={logo}/>
            <p>MAXIME ROUYRRE</p>
          </Link>
        </div>
        <div className='content'>
          <Switch>
            <Route exact path={`${basename}/design-mi/`} >
              <div
                style={{
                  overflow: 'hidden',
                  width: '100%',
                  height: '100vh',
                  top: 0,
                  left: 0,
                  position: 'fixed',
                  textAlign: 'center',
                  fontFamily: 'Ubuntu, arial',
                  zIndex: -1}}
              >
              <div className='tagline'
                style={{
                  position: 'absolute',
                  margin: 'auto',
                  top: '50%',
                  left: '20%',
                  transform: 'translate(-12.5%, -50%)',
                  WebkitTextStroke: '2px Black',
                  color: 'transparent',
                  fontSize: '5em'
                }}
              >
                LET'S CODE THINGS
              </div>
              </div>
            </Route>
            <Route path={`${basename}/design-mi/about`} >
              <div className='tagline'
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                  width: '60%'
                }}
              >
                <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                  <img style={{border: 'solid 2px black', maxWidth: '75%', filter: 'grayscale(25%)', margin: '1em'}}
                      src='https://www.gravatar.com/avatar/e5245156ef88ce267e06145a8c777277?s=200&d=mm&r=x'
                      alt=''
                      />
                </div>
                <div style={{display: 'inline-block', fontSize: '1.2em'}}>
                  <p>
                      Hi! I'm Maxime Rouyrre. I'm an Entrepreneur, UX Designer & Full-stack Web Engineer.
                    </p><p>
                      Currently working a full time job but we can do some networking !
                    </p><p>
                      You can meet me in Paris, France.
                    </p>
                </div>
              </div>
            </Route>
            <Route path={`${basename}/design-mi/blog`}>
              <BlogList />
            </Route>
          </Switch>
        </div>
        <div className='pure-g' style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', fontSize: '5vw', backgroundColor: 'white'}}>
          <div className='pure-u-1-3' style={{margin: '1em 0em'}}>
            <Link to={`${process.env.PUBLIC_URL}/design-mi/about`}>
              ABOUT ME
            </Link>
          </div>
          <div className='pure-u-1-3' style={{margin: '1em 0em'}}>
            <Link to={`${process.env.PUBLIC_URL}/design-mi/blog`}>
              BLOG
            </Link>
          </div>
          <div className='pure-u-1-3' style={{margin: '1em 0em'}}>
            <Link to={`${process.env.PUBLIC_URL}/design-mi/contact`}>
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default sizeMe()(Home)
