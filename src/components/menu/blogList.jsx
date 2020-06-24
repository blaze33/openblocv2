import React, {Component} from 'react'
import moment from 'moment'
import openblocBlog from '../../images/openblocBlog.jpg'
import {Loader} from 'react-loaders'
import {connect} from 'react-redux'

const blogUrl = 'https://blog.openbloc.com'

class BlogList extends Component {

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
        {this.props.ready && this.props.posts.map((post, index) => (
          <tr key={index} onClick={() => window.location = blogUrl + post.url}>
            <td>
              <a href={post.url}>
                {post.title}
                <br />
                <span className='date'>{moment(post.published_at).format('YYYY-MM-DD')}</span>
              </a>
            </td>
            <td><img alt='' src={post.feature_image}/></td>
          </tr>
            )
          )}
          {this.props.fetching && (
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
    posts: state.blog.posts,
    ready: state.blog.ready,
    fetching: state.blog.fetching
  }
}

export default connect(mapStateToProps)(BlogList)
