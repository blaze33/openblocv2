import cx from 'classnames'
import Color from 'color'
import moment from 'moment'
import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { localPoint } from '@vx/event'
import { GridColumns } from '@vx/grid'
import { Group } from '@vx/group'
import { scaleTime, scaleOrdinal, scalePower } from '@vx/scale'
import { Line, Bar } from '@vx/shape'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { extent } from 'd3-array'
import { easeCubicInOut } from 'd3-ease'
import { interpolateRound } from 'd3-interpolate'
import { scalePow } from 'd3-scale'

import fisheye from '../plugins/fisheye'

const data = [
  { time: moment('1983-11-03'), life: 'Still alive !', 'end': moment() },

  { time: moment('1994-09-01'), education: 'Collège Marguerite de Navarre', color: '#E0E4CC', end: moment('1998-06-30') },
  { time: moment('1998-09-01'), education: 'Lycée Louis Barthou', color: '#E0E4CC', end: moment('2001-06-30') },
  { time: moment('2001-09-01'), education: 'Lycée Michel Montaigne', color: '#E0E4CC', end: moment('2003-08-01') },
  { time: moment('2003-09-01'), education: 'ENSTA', color: '#F38630', end: moment('2007-10-18') },
  { time: moment('2005-09-01'), education: 'UPM-ETSII', color: '#E15E00', end: moment('2006-06-30') },

  { time: moment('2007-04-01'), work: 'EDF R&D', end: moment('2007-08-30') },
  { time: moment('2008-10-01'), work: 'Altran', color: '#007eaf', end: moment('2011-02-01') },

  { time: moment('2012-03-01'), entrepreneurship: 'Newco Project', end: moment('2013-04-01') },

  { time: moment('2013-10-01'), work: 'Pricing Assistant', end: moment('2014-01-15') },
  { time: moment('2014-01-15'), work: 'KitchenTrotter', end: moment('2014-02-28') },
  { time: moment('2015-05-04'), work: 'Smart Impulse', color: '#7bc623', end: moment() },

  { time: moment('2017-01-01'), now: '2017', end: moment() },
  { time: moment(), now: 'now', end: moment() }
]

const categoryKeys = [ 'now', 'entrepreneurship', 'work', 'education', 'life' ].reverse()
const categoryColors = [ '#A7DBD8', '#69D2E7', '#E0E4CC', '#FA6900', '#f8eacb' ].reverse()

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.minY = 12.5
    this.maxY = 280
    this.maxDeformation = this.props.size.width < 800 ? 0 : 2
    this.state = {
      height: this.minY,
      mouseOn: false,
      mouseX: 200,
      mouseY: 0,
      deformation: 0
    }
    this.start = null
    this.transitionTime = 300
    this.step = 100
    this.paddingInner = 100
    this.paddingOuter = 100
    this.marginTop = 10
    this.marginLeft = 1
    this.zScale = scaleOrdinal({
      domain: categoryKeys,
      range: categoryColors
    })
    this.fisheye = fisheye.scale(scalePow().exponent(1.1).copy)
    this.xMax = this.props.width - this.marginLeft
    this.xScale = scaleTime({
      rangeRound: [1, this.xMax - this.marginLeft * 2],
      domain: extent(data, d => d.time)
    })
    this.xPowScale = scalePower({
      range: [0.1, this.xMax - this.marginLeft * 2],
      domain: [0.1, this.xMax - this.marginLeft * 2]
    }).exponent(1.1)

    this.yScale = scaleOrdinal({
      domain: categoryKeys,
      range: categoryKeys.map((d, i) => {
        return interpolateRound(this.minY, this.state.height)(i / categoryKeys.length)
      })
    })
    this.setupScales()
  }

  tween = (property, value, duration) => {
    const startValue = this.state[property]
    let start = null
    const animate = (timestamp) => {
      if (start === null) {
        start = timestamp
      }
      let time = timestamp - start
      if (time < duration) {
        this.setState(prevState => {
          let newState = {...prevState}
          newState[property] = easeCubicInOut(time / duration) * value + (1 - easeCubicInOut(time / duration)) * startValue
          return newState
        })
        window.requestAnimationFrame(animate)
      } else {
        this.setState(prevState => {
          let newState = {...prevState}
          newState[property] = value
          return newState
        })
      }
    }
    window.requestAnimationFrame(animate)
  }

  handleClick = (event) => {
    this.tween('height', this.state.height === this.minY ? this.maxY : this.minY, this.transitionTime)
  }

  componentWillUpdate (nextProps) {
    this.setupScales()
  }

  setupScales = () => {
    this.xMax = this.props.width - this.marginLeft * 2
    this.xScale.rangeRound([1, this.xMax - this.marginLeft * 2])
    this.xPowScale.range([0.1, this.xMax - this.marginLeft * 2])
                  .domain([0.1, this.xMax - this.marginLeft * 2])

    this.yScale.range(categoryKeys.map(
                  (d, i) => interpolateRound(this.minY, this.state.height)(i / categoryKeys.length))
               )
               .domain(categoryKeys)

    this.fisheyeX = this.fisheye.domain(this.xPowScale.domain())
                                .range(this.xPowScale.range())
                                .focus(this.state.mouseX - this.marginLeft)
                                .distortion(this.state.deformation)
  }

  render () {
    return (
      <div style={{width: '100%', margin: 'auto', position: 'relative'}} >
        <button className='pure-button' onClick={this.handleClick}>Expand timeline</button><br />
        <svg
          ref={s => (this.svg = s)}
          width={this.props.width}
          height={this.state.height + this.marginTop + 100}
          onMouseEnter={event => {
            this.tween('deformation', this.maxDeformation, 500)
          }}
          onMouseMove={event => {
            const {x, y} = localPoint(this.svg, event)
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(this.xScale.range()[1] + this.marginLeft, Math.max(x, this.marginLeft)), mouseY: y}
            })
          }}
          onMouseLeave={event => {
            this.tween('deformation', 0, 500)
          }}
          onTouchStart={event => {
            this.tween('deformation', this.maxDeformation, 500)
            const {x, y} = localPoint(this.svg, event.touches[0])
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(this.xScale.range()[1] + this.marginLeft, Math.max(x, this.marginLeft)), mouseY: y}
            })
          }}
          onTouchMove={event => {
            const {x, y} = localPoint(this.svg, event.touches[0])
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(this.xScale.range()[1] + this.marginLeft, Math.max(x, this.marginLeft)), mouseY: y}
            })
          }}
        >
          <rect x={0} y={0} width={this.props.width} height={this.state.height + this.marginTop + 100} opacity={1} fill='#fff' />
          <Group className={cx('vx-bar-stack', this.props.className)} top={this.marginTop} left={this.marginLeft}>
            <AxisLeft
              tickLabelProps={(value, index) => ({
                opacity: index === 0 ? 1 : (this.state.height - this.minY) / (150 - this.minY),
                dx: '-2em',
                dy: '0.25em',
                textAnchor: 'start',
                fontFamily: 'sans-serif',
                fontSize: 14,
                fill: 'black'
              })}
              scale={this.yScale}
              left={this.xMax / 2}
              top={-5}
            />
            <GridColumns scale={this.fisheyeX} numTicks={15} top={20} left={this.marginLeft} height={this.state.height - this.minY + 35} />
            <AxisBottom
              scale={this.fisheyeX}
              tickValues={this.fisheyeX.ticks(15)}
              tickFormat={x => moment(this.xScale.invert(x)).format('YYYY')}
              top={this.state.height + 40}
              left={this.marginLeft}
            />
            {categoryKeys &&
            categoryKeys.map((key, i) => {
              return (
                <Group key={`vx-bar-stack-${i}`} top={20}>
                  {data.filter(d => d[key]).map((d, ii) => {
                    const x1 = this.fisheyeX(this.xScale(d.time))
                    const barHeight = this.fisheyeX(this.xScale(d.end)) - x1
                    const bandwidth = 30
                    return (
                      <Bar
                        key={`bar-group-bar-${i}-${ii}-${key}`}
                        x={x1}
                        y={this.yScale(key) - bandwidth / 2}
                        width={barHeight}
                        height={bandwidth}
                        fill={d.color ? d.color : this.zScale(key)}
                        stroke={Color(d.color ? d.color : this.zScale(key)).darken(0.1)}
                        rx={0}
                        data={{
                          bandwidth,
                          paddingInner: this.paddingInner,
                          paddingOuter: this.paddingOuter,
                          step: this.step,
                          key: key,
                          value: d[key],
                          height: barHeight,
                          width: bandwidth,
                          x: d => d.start,
                          xFormatted: d => d.start.format(),
                          data: d
                        }}
                        onMouseMove={data => event => {
                          const { x } = localPoint(this.svg, event)
                          const x0 = this.xScale.invert(this.fisheyeX.invert(x - this.marginLeft))
                          this.props.showTooltip({
                            tooltipData: {x0, left: event.clientX, ...data},
                            tooltipTop: this.yScale(0),
                            tooltipLeft: this.xPowScale(this.xScale(x0))
                          })
                        }}
                        onMouseLeave={data => event => {
                          this.props.hideTooltip()
                        }}
                        onTouchMove={data => event => {
                          const { x } = localPoint(this.svg, event.touches[0])
                          const x0 = this.xScale.invert(this.xPowScale.invert(x - this.marginLeft))
                          this.props.showTooltip({
                            tooltipData: {x0, left: event.clientX, ...data},
                            tooltipTop: this.yScale(0),
                            tooltipLeft: this.xPowScale(this.xScale(x0))
                          })
                        }}
                        onTouchEnd={data => event => {
                          this.props.hideTooltip()
                        }}
                      />
                    )
                  })}
                </Group>
              )
            })}

            {this.props.tooltipOpen && <g>
              <Line
                from={{ x: this.props.tooltipLeft, y: this.props.tooltipTop }}
                to={{ x: this.props.tooltipLeft, y: Math.max(this.marginTop + this.state.height, 50) + this.props.tooltipTop }}
                stroke='#666'
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray='2,2'
              />
            </g>
            }
          </Group>
        </svg>
        {this.props.tooltipOpen &&
        <Tooltip
          top={this.props.tooltipTop + this.state.height * 0.8}
          left={this.props.tooltipData.left - 100 * this.props.tooltipData.left / this.props.width}
          style={{
            minWidth: 60,
            maxWidth: 100,
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #555',
            borderRadius: '5px'
          }}
          >{this.props.tooltipData.value}<br />{moment(this.props.tooltipData.x0).format('YYYY-MM-DD')}</Tooltip>
      }
      </div>
    )
  }
}

export default sizeMe()(withTooltip(Timeline))
