import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { Switch, Route } from 'react-router-dom'
import BlogList from '../components/menu/blogList'
import Contact from '../components/menu/contact'
import Timeline from '../components/timeline'

const basename = process.env.PUBLIC_URL

class Home extends Component {
  render () {
    return (
      <div className='IM pure-g'>
        <div className='header pure-u-1'>
          <Link to={`${basename}/home/`}>
            <img alt='logo' className='App-logo' src={logo}/>
            <p>MAXIME ROUYRRE</p>
          </Link>
        </div>
        <div className='content'>
          <Switch>
            <Route exact path={`${basename}/home/`} >
              <div className='tagline'>
                <Link to={`${basename}/`}>LET'S CODE THINGS</Link>
              </div>
            </Route>
            <Route path={`${basename}/home/about`} >
              <section>
              <div className='about'
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
                <div style={{display: 'inline-block', verticalAlign: 'middle', maxWidth: '20em'}}>
                  <p>
                      Hi! I'm Maxime Rouyrre. I'm an Entrepreneur, UX Designer & Full-stack Web Engineer.
                    </p><p>
                      Currently working a full time job but we can do some networking !
                    </p><p>
                      You can meet me in Paris, France.
                    </p>
                </div>
              </div>
              <div>
                <Timeline width={this.props.size.width} height={400} />
              </div>
            </section>
            </Route>
            <Route path={`${basename}/home/blog`}>
              <BlogList />
            </Route>
            <Route path={`${basename}/home/contact`}> 
              <Contact />
            </Route>
            <div className='content' style={{textAlign: 'center'}}>
              <h2>404</h2>
              <p>This webpage address does not exist</p>
              <p><Link to={`${basename}/`}>HOMEPAGE</Link></p>
            </div>
          </Switch>
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

export default sizeMe()(Home)
