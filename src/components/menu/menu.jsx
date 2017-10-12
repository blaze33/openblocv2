import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaGithub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaEnvelope from 'react-icons/lib/fa/envelope'

import logo from '../../images/logo.png'
import BlogItem from './blogItem'
import careersIcon from '../../images/careers-icon.png'
import StackoverflowIcon from '../../images/so-icon.png'
import InstagramIcon from '../../images/instagram-icon.png'

class Menu extends Component {
  render () {
    return (
      <div className='AppHeader pure-menu pure-menu-horizontal'>
        <Link to='/' className='pure-menu-heading pure-menu-link'>
          <img src={logo} className='App-logo' alt='logo' />
          Openbloc
        </Link>
        <ul className='pure-menu-list'>
          <BlogItem />
          <li className='contactLinks pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
            <div className='pure-menu-link'>Contact</div>
            <ul className='pure-menu-children'>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link'
                  title='email'>
                  <FaEnvelope /> max <small>at</small> openbloc <small>dot</small> fr
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link linkedin'
                  href='https://fr.linkedin.com/pub/maxime-rouyrre/28/a6/728/'
                  title='Linkedin'>
                  <FaLinkedin /> linkedin
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link github'
                  href='https://github.com/blaze33'
                  title='Github'>
                  <FaGithub /> @blaze33
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link twitter'
                  href='https://twitter.com/maxMRE'
                  title='Twitter'>
                  <FaTwitter /> @maxmre
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link'
                  href='https://www.instagram.com/maxmre/'
                  title='Instagram'>
                  <img src={InstagramIcon} alt='Instagram' /> @maxmre
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link icon-stackoverflow'
                  href='https://stackoverflow.com/users/343834/maxime-r'
                  title='Stackoverflow'>
                  <img src={StackoverflowIcon} alt='Stackoverflow' /> Stackoverflow
              </a>
              </li>
              <li className='pure-menu-item'>
                <a
                  className='pure-menu-link icon-careers'
                  href='https://stackoverflow.com/story/maxmre '
                  title='Developer story'>
                  <img src={careersIcon} alt='Developer story' />Developer Story
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
