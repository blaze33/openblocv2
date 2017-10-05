import React, { Component } from 'react';
import moment from 'moment'
import './styles/App.scss';
import sizeMe from 'react-sizeme'
import Menu from './components/menu/menu'
import Timeline from './components/timeline'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu className="AppHeader" />
        <div className="AppContent">
          <section className="pure-g">
            <div className="pure-u-1-24 pure-u-md-4-24"></div>
            <div className="pure-u-22-24 pure-u-md-16-24">
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3">
                  <img style={{borderRadius: "50%", maxWidth: '75%'}}
                    src="https://www.gravatar.com/avatar/e5245156ef88ce267e06145a8c777277?s=200&d=mm&r=x"
                    alt=''
                    />

                </div>
                <div className="pure-u-1 pure-u-md-2-3">
                  <p>
                    Hi! I'm Maxime Rouyrre. I'm an Entrepreneur, UX Designer & Full-stack Web Engineer.
                  </p><p>
                    Currently working a full time job but we can do some networking !
                  </p><p>
                    You can meet me in Paris, France.
                  </p>
                </div>
              </div>
            </div>
            <div className="pure-u-1-24 pure-u-md-4-24"></div>
          </section>
          <section className="pure-g">
            <div className='pure-u-1'>
              <Timeline width={this.props.size.width} height={400} />
            </div>
          </section>
        </div>
        <div className="AppFooter">
          <small>Openbloc © 1983 - {moment().format('YYYY')}</small>
        </div>
      </div>
    );
  }
}

export default sizeMe()(App);
