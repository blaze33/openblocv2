import React, {Component} from 'react'
import moment from 'moment'
import openblocBlog from '../../images/openblocBlog.jpg'
import {Loader} from 'react-loaders'

const blogUrl = 'https://blog.openbloc.fr'
const blogApiUrl = `${blogUrl}/ghost/api/v0.1`
const authData = 'client_id=ghost-frontend&client_secret=bb06581e7cc4'

class BlogList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      ready: false
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
        this.setState({posts: json.posts, ready: true})
        console.log(json.posts)
      }
    )
  }

  render () {
    return (
      <table className='blogList'>
      <tbody>
        <tr>
          <td>
          <a href={blogUrl}>
            Blog Home
            </a>
          </td>
          <td><img alt='Openbloc Blog' src={openblocBlog} /></td>
        </tr>
        {this.state.ready ? this.state.posts.map((post, index) => (
          <tr key={index} onClick={() => window.location = blogUrl + post.url}>
            <td>
              <a href={blogUrl + post.url}>
                {post.title}
                <br />
                <span className='date'>{moment(post.published_at).format('YYYY-MM-DD')}</span>
              </a>
            </td>
            <td><img alt='' src={post.feature_image}/></td>
          </tr>
            )
          ) : (
            <tr>
            <td colSpan={2} style={{textAlign: 'center', padding: '3em', border: 'none'}}>
            <Loader type="line-scale" active />
            </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default BlogList
