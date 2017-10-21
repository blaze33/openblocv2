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

class Contact extends Component {
  render () {
    return (
      <div className='contact'>
        <table>
          <tbody>
            <tr>
              <td>
                <a
                  
                  title='email'>
                  max <small>at</small> openbloc <small>dot</small> fr
              </a>
              </td>
              <td className='email'><FaEnvelope /> </td>
            </tr><tr onClick={() => window.location = 'https://fr.linkedin.com/pub/maxime-rouyrre/28/a6/728/'}>
              <td>
                <a
                  
                  href='https://fr.linkedin.com/pub/maxime-rouyrre/28/a6/728/'
                  title='Linkedin'>
                  Linkedin
              </a>
              </td>
              <td className=' linkedin'><FaLinkedin />  </td>
            </tr><tr  onClick={() => window.location = 'https://github.com/blaze33'}>
              <td>
                <a
                  
                  href='https://github.com/blaze33'
                  title='Github'>
                   @blaze33
              </a>
              </td>
              <td className=' github'><FaGithub />  </td>
            </tr><tr onClick={() => window.location = 'https://twitter.com/maxMRE'}>
              <td>
                <a
                  
                  href='https://twitter.com/maxMRE'
                  title='Twitter'>
                   @maxmre
              </a>
              </td>
              <td className=' twitter'><FaTwitter /></td>
            </tr><tr onClick={() => window.location = 'https://www.instagram.com/maxmre/'}>
              <td>
                <a
                  
                  href='https://www.instagram.com/maxmre/'
                  title='Instagram'>
                   @maxmre
              </a>
              </td>
              <td><img src={InstagramIcon} alt='Instagram' /></td>
            </tr><tr onClick={() => window.location = 'https://stackoverflow.com/users/343834/maxime-r'}>
              <td>
                <a
                  className='icon-stackoverflow'
                  href='https://stackoverflow.com/users/343834/maxime-r'
                  title='Stackoverflow'>
                   Stackoverflow
              </a>
              </td>
              <td><img src={StackoverflowIcon} alt='Stackoverflow' /></td>
            </tr><tr onClick={() => window.location = 'https://stackoverflow.com/story/maxmre'}>
              <td>
                <a
                  className='icon-careers'
                  href='https://stackoverflow.com/story/maxmre'
                  title='Developer story'>
                  Developer Story
              </a>
              </td>
              <td><img src={careersIcon} alt='Developer story' /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Contact
