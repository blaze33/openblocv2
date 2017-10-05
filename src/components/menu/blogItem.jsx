import React, {Component} from 'react'
import moment from 'moment'
const blogUrl = 'https://blog.openbloc.fr'
const blogApiUrl = `${blogUrl}/ghost/api/v0.1`
const authData = 'client_id=ghost-frontend&client_secret=bb06581e7cc4'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount () {
    this.fetchPosts()
  }

  fetchPosts () {
    window.fetch(
      `${blogApiUrl}/posts/?${authData}`,
      {mode: 'cors'}
    ).then(
      response => response.json()
    ).then(
      json => {
        console.log(json.posts)
        this.setState({posts: json.posts})
      }
    )
  }

  render () {
    return (
      <li className='blogLinks pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
        <div className='pure-menu-link'>Blog</div>
        <ul className='pure-menu-children'>
          <li className='pure-menu-item'>
            <a href={blogUrl} className='pure-menu-link'>
              Blog Home
              </a>
          </li>
          {this.state.posts.map((post, index) => (
            <li className='pure-menu-item' key={index}>
              <a href={blogUrl + post.url} className='pure-menu-link blogPostLink'>
                {post.title}
                <br />
                <span>{moment(post.published_at).format('YYYY-MM-DD')}</span>
              </a>
            </li>
              )
            )}
        </ul>
      </li>
    )
  }
}

export default Menu
