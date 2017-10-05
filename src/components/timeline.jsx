import React, { Component } from 'react'
import {Line, Bar} from '@vx/shape'
import {scaleTime, scaleOrdinal, scalePower } from '@vx/scale'
import { extent } from 'd3-array'
import moment from 'moment'
import {interpolateRound} from 'd3-interpolate'
import {Group} from '@vx/group'
import cx from 'classnames';
import { AxisLeft, AxisBottom } from '@vx/axis'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { localPoint } from '@vx/event'
import {easeCubicInOut} from 'd3-ease'
import sizeMe from 'react-sizeme'
import Color from 'color'
import fisheye from '../plugins/fisheye'
import {scaleLinear, scalePow} from 'd3-scale'

window.fisheye = fisheye
window.scaleLinear = scaleLinear
window.scalePow = scalePow


const data = [
  { time: moment("1983-11-03"), life: 'Still alive !', "end": moment()},

  { time: moment("1994-09-01"), education: 'Collège Marguerite de Navarre', color: '#E0E4CC', end: moment("1998-06-30")},
  { time: moment("1998-09-01"), education: 'Lycée Louis Barthou', color: '#E0E4CC', end: moment("2001-06-30")},
  { time: moment("2001-09-01"), education: 'Lycée Michel Montaigne', color: '#E0E4CC', end: moment("2003-08-01")},
  { time: moment("2003-09-01"), education: 'ENSTA', color: '#F38630', end: moment("2007-10-18")},
  { time: moment("2005-09-01"), education: 'UPM-ETSII', color: '#E15E00', end: moment("2006-06-30")},
  

  { time: moment("2007-04-01"), work: 'EDF R&D', end: moment("2007-08-30")},
  { time: moment("2008-10-01"), work: 'Altran', color: '#007eaf', end: moment("2011-02-01")},

  { time: moment("2012-03-01"), entrepreneurship: 'Newco Project', end: moment("2013-04-01")},

  { time: moment("2013-10-01"), work: 'Pricing Assistant', end: moment("2014-01-15")},
  { time: moment("2014-01-15"), work: 'KitchenTrotter', end: moment("2014-02-28")},
  { time: moment("2015-05-04"), work: 'Smart Impulse', color: '#7bc623', end: moment()},

  { time: moment("2017-01-01"), now: '2017'  , end: moment()},
  { time: moment(), now: 'now'  , end: moment()},
]
window.data = data
window.moment = moment

const categoryKeys = [ 'now', 'entrepreneurship', 'work', 'education', 'life'].reverse()
const categoryColors = ['#A7DBD8', '#69D2E7', '#E0E4CC', '#FA6900', '#f8eacb'].reverse()
window.categoryKeys=categoryKeys

class Timeline extends Component {

  constructor(props) {
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
          newState[property] = easeCubicInOut(time/duration) * value + (1 - easeCubicInOut(time/duration)) * startValue
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

  render() {
    const step = 100
    const paddingInner = 100
    const paddingOuter = 100
    const marginTop = 10
    const marginLeft = 1
    const xMax = this.props.width - marginLeft
    const xScale = scaleTime({
      rangeRound: [1, xMax - marginLeft * 2],
      domain: extent(data, d => d.time)
    })
    const xPowScale = scalePower({
      range: [0.1, xMax - marginLeft * 2],
      domain: [0.1, xMax - marginLeft * 2],
    }).exponent(1.1)

    const yScale = scaleOrdinal({
      domain: categoryKeys,
      range: categoryKeys.map((d, i) => {
        return interpolateRound(this.minY, this.state.height)(i / categoryKeys.length)
      })
    })

    const zScale = scaleOrdinal({
      domain: categoryKeys,
      range: categoryColors 
    })
    
    const fisheyeX = fisheye.scale(scalePow().exponent(1.1).copy)
                            .domain(xPowScale.domain())
                            .range(xPowScale.range())
                            .focus(this.state.mouseX - marginLeft)
                            .distortion(this.state.deformation)

    return (
      <div style={{width: '100%', margin: 'auto', position: 'relative'}} >
      <button className="pure-button" onClick={this.handleClick}>Expand timeline</button><br />
      <svg
        ref={s => (this.svg = s)}
        width={this.props.width}
        height={this.state.height + marginTop + 100}
      >
        <Group className={cx('vx-bar-stack', this.props.className)} top={marginTop} left={marginLeft}
          onMouseEnter={event => {
            this.tween('deformation', this.maxDeformation, 500)
          }}
          onMouseMove={event => {
            const {x, y} = localPoint(this.svg, event)
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(xScale.range()[1] + marginLeft, Math.max(x, marginLeft)), mouseY: y}
            })
          }}
          onMouseLeave={event => {
            this.tween('deformation', 0, 300)
          }}
          onTouchStart={event => {
            this.tween('deformation', this.maxDeformation, 500)
            const {x, y} = localPoint(this.svg, event.touches[0])
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(xScale.range()[1] + marginLeft, Math.max(x, marginLeft)), mouseY: y}
            })
          }}
          onTouchMove={event => {
            const {x, y} = localPoint(this.svg, event.touches[0])
            this.setState(prevState => {
              return {...prevState, mouseX: Math.min(xScale.range()[1] + marginLeft, Math.max(x, marginLeft)), mouseY: y}
            })
          }}
        >
          <rect x={0} y={0} width={this.props.width} height={this.state.height + marginTop + 100} opacity={0}></rect>
          <AxisLeft
            tickLabelProps={(value, index) => ({
              opacity: index === 0 ? 1 : (this.state.height - this.minY) / (150 - this.minY),
              dx: '-0.25em',
              dy: '0.25em',
              textAnchor: 'end',
              fontFamily: 'sans-serif',
              fontSize: 14,
              fill: 'black'
            })}
            scale={yScale}
            left={xMax / 2}
            top={-5}
          />
          <AxisBottom
            scale={xPowScale}
            tickValues={xPowScale.ticks(15).map(x => fisheyeX(x))}
            tickFormat={x => moment(xScale.invert(fisheyeX.invert(x))).format('YYYY')}
            top={this.state.height + 40}
          />
          {categoryKeys &&
            categoryKeys.map((key, i) => {
              return (
                <Group key={`vx-bar-stack-${i}`} top={20}>
                  {data.filter(d => d[key]).map((d, ii) => {
                    const barHeight = fisheyeX(xScale(d.end)) - fisheyeX(xScale(d.time));
                    const bandwidth = 30
                    return (
                      <Bar
                        key={`bar-group-bar-${i}-${ii}-${key}`}
                        x={fisheyeX(xScale(d.time))}
                        y={yScale(key) - bandwidth/2}
                        width={barHeight}
                        height={bandwidth}
                        fill={d.color ? d.color : zScale(key)}
                        stroke={Color(d.color ? d.color : zScale(key)).darken(.1)}
                        rx={0}
                        data={{
                          bandwidth,
                          paddingInner,
                          paddingOuter,
                          step,
                          key: key,
                          value: d[key],
                          height: barHeight,
                          width: bandwidth,
                          x: d =>d.start,
                          xFormatted: d => d.start.format(),
                          data: d,
                        }}
                        onMouseMove={data => event => {
                          const { x } = localPoint(this.svg, event);
                          // console.log(x, y, this.fisheye)
                          const x0 = xScale.invert(xPowScale.invert(x - marginLeft));
                          this.props.showTooltip({
                            tooltipData: {x0, left: event.clientX, ...data},
                            tooltipTop: yScale(0),
                            tooltipLeft: xPowScale(xScale(x0))
                          }); 
                        }}
                        onMouseLeave={data => event => {
                          this.props.hideTooltip()
                        }}
                        onTouchMove={data => event => {
                          const { x } = localPoint(this.svg, event.touches[0]);
                          // console.log(x, y, this.fisheye)
                          const x0 = xScale.invert(xPowScale.invert(x -  marginLeft));
                          console.log(x0, xScale(x0))
                          this.props.showTooltip({
                            tooltipData: {x0, left: event.clientX, ...data},
                            tooltipTop: yScale(0),
                            tooltipLeft: xPowScale(xScale(x0))  
                          });
                        }}
                        onTouchEnd={data => event => {
                          this.props.hideTooltip()
                        }}
                      />
                    );
                  })}
                </Group>
              );
          })}
          
          {this.props.tooltipOpen && <g>
              <Line
                from={{ x: this.props.tooltipLeft, y: this.props.tooltipTop }}
                to={{ x: this.props.tooltipLeft, y: Math.max(marginTop + this.state.height, 50) + this.props.tooltipTop }}
                stroke="#666"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              </g>
            }
        </Group>  
      </svg>
      {this.props.tooltipOpen &&
          <Tooltip
            top={this.props.tooltipTop + this.state.height * .8 + 105}
            left={this.props.tooltipData.left - 100 * this.props.tooltipData.left / this.props.width }
            style={{
              minWidth: 60,
              maxWidth: 100,
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #555',
              borderRadius: '5px',
            }}
          >{this.props.tooltipData.value}<br/>{moment(this.props.tooltipData.x0).format("YYYY-MM-DD")}</Tooltip>
      }
      </div>
    );
  }
}

export default sizeMe()(withTooltip(Timeline));
