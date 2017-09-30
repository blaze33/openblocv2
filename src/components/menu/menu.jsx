import React, {Component} from 'react'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaGithub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaInstagram from 'react-icons/lib/fa/instagram'
import FaEnvelope from 'react-icons/lib/fa/envelope'

import logo from '../../images/logo.png'
import BlogItem from './blogItem'
import careersIcon from '../../images/careers-icon.png'
import StackoverflowIcon from '../../images/so-icon.png'
import InstagramIcon from '../../images/instagram-icon.png'

class Menu extends Component {
  render() {
    return (
    <div className="AppHeader pure-menu pure-menu-horizontal">
      <a href="#" className="pure-menu-heading pure-menu-link">
        <img src={logo} className="App-logo" alt="logo" />
        Openbloc
      </a>
      <ul className="pure-menu-list">
        <BlogItem />
        <li className="contactLinks pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <a href="#" className="pure-menu-link">Contact</a>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <a
                className='pure-menu-link'
                title="email">
                  <FaEnvelope /> max <small>at</small> openbloc <small>dot</small> fr
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link linkedin'
                href="https://fr.linkedin.com/pub/maxime-rouyrre/28/a6/728/"
                title="Linkedin">
                  <FaLinkedin /> linkedin
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link github'
                href="https://github.com/blaze33"
                title="Github">
                  <FaGithub /> @blaze33
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link twitter'
                href="https://twitter.com/maxMRE"
                title="Twitter">
                  <FaTwitter /> @maxmre
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link'
                href="https://www.instagram.com/maxmre/"
                title="Instagram">
                  <img src={InstagramIcon} /> @maxmre
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link icon-stackoverflow'
                href="https://stackoverflow.com/users/343834/maxime-r"
                title="Stackoverflow">
                  <img src={StackoverflowIcon} /> Stackoverflow
              </a>
            </li>
            <li className="pure-menu-item">
              <a
                className='pure-menu-link icon-careers'
                href="https://stackoverflow.com/story/maxmre "
                title="Developer story">
                  <img src={careersIcon} />Developer Story
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    )
  }
}

export default Menu