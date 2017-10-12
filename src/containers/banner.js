import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import {interpolatePath} from 'd3-interpolate-path'
import absolutePolygons from '../data/points'
import { LinePath } from '@vx/shape'
import bannerJPG from '../images/banner-6.jpg'

// const absolutePolygons = polygons.map(polygon => {
//   let path = []
//   polygon.path.reduce((acc, v) => {
//     const relative = v.letter === v.letter.toLowerCase()
//     const point = {}
//     if (relative) {
//       point.x = acc.x + (v.x ? v.x : 0)
//       point.y = acc.y + (v.y ? v.y : 0)
//     } else {
//       point.x = v.x ? v.x : acc.x
//       point.y = v.y ? v.y : acc.y
//     }
//     path.push(point)
//     return point
//   }, {x: 0, y: 0})
//   path.push(path[0])
//   return {length: polygon.length, path: path}
// })
// window.polygons = absolutePolygons

class Banner extends Component {
  handleClick = event => {
    console.log(this.props)
    const line = d3.line().x(x => x.x).y(y => y.y)
    const rect = line([{x: 0, y: 0}, {x: 1600, y: 0}, {x: 1600, y: 900}, {x: 0, y: 900}, {x: 0, y: 0}]) + 'Z'
    d3.selectAll('path.small')
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()

    d3.select('path.big')
      .attr('stroke-dasharray', null)
      .transition()
      .duration(1000)
      .ease(d3.easeExpInOut)
      .attrTween('d', function (d) {
        return interpolatePath(d3.select(this).attr('d'), rect)
      })
      .on('end', () => this.props.history.push('/home'))
  }

  render () {
    return (
      <div style={{overflow: 'hidden', width: '100%', height: '100vh', position: 'relative'}} onClick={this.handleClick}>
        <svg viewBox='0 0 1600 900'
          style={{
            width: '100vw',
            height: '56.25vw',
            position: 'absolute',
            minHeight: '100vh',
            minWidth: '177.778vh',
            margin: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <defs>
            <pattern id='background' patternUnits='userSpaceOnUse' width='1600' height='900'>
              <image xlinkHref={bannerJPG} x='0' y='0' width='1600' height='900' />
            </pattern>
          </defs>
          {absolutePolygons && absolutePolygons.map((polygon, i) => {
            return <LinePath
              key={`polygon-${i}`}
              data={polygon.path}
              xScale={x => x}
              yScale={y => y}
              x={p => p.x}
              y={p => p.y}
              strokeWidth={2}
              stroke={'#111'}
              strokeDasharray={polygon.length}
              strokeDashoffset={polygon.length}
              className={polygon.length > 2000 ? 'big' : 'small'}
            >
              <animate attributeType='XML' attributeName='stroke-dashoffset'
                to='0' dur='2s' fill='freeze' />
            </LinePath>
          })

          }
        </svg>
        <div
          style={{
            position: 'absolute',
            margin: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <Link to='/home' onClick={e => e.preventDefault()}><h1>Openbloc</h1></Link>
        </div>
      </div>
    )
  }
}

export default Banner
