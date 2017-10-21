import React, {Component} from 'react'
import moment from 'moment'
import openblocBlog from '../../images/openblocBlog.jpg'
import {Loader} from 'react-loaders'
import {connect} from 'react-redux'
import {action} from '../../store'

const blogUrl = 'https://blog.openbloc.fr'
const blogApiUrl = `${blogUrl}/ghost/api/v0.1`
const authData = 'client_id=ghost-frontend&client_secret=bb06581e7cc4'


class BlogList extends Component {

  constructor(props) {
    super(props)
    action('POSTS_FETCH_REQUESTED')
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
        {this.props.blog.ready && this.props.blog.posts.map((post, index) => (
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
          )}
          {this.props.blog.fetching && (
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

const mapStateToProps = state => {
  return {
    blog: state.blog
  }
}

export default connect(mapStateToProps)(BlogList)
