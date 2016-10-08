/* @flow */

import React, { Component } from 'react'

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

type Props = {
  className?: string,
  timestamp: number
};

class RelativeTime extends Component {

  props: Props;

  static defaultProps: Props;

  state: { relativeTime?: string };

  interval: ?number;

  setInterval () {
    this.interval = setInterval.apply(null, arguments)
  }

  componentWillMount () {
    this.setState({ relativeTime: undefined })
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (nextProps: Props) {
    this.parseRelativeTime(nextProps)

    if (!this.interval) {
      const { timestamp } = nextProps
      const timeDifference = Date.now() - timestamp
      this.setInterval(this.parseRelativeTime.bind(this), this.determineIntervalDelay(timeDifference))
    }
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }

  determineIntervalDelay (timeDifference: number): number {
    // Update every half a second if time difference in the seconds
    if (timeDifference < MINUTE) {
      return 500
    }
    // Update every 10 seconds if time difference in the minutes
    if (timeDifference < HOUR) {
      return 10 * 1000
    }
    // Update every 5 minutes if time difference in the hours
    if (timeDifference < DAY) {
      return 5 * MINUTE
    }
    // Else update every hour
    return 24 * HOUR
  }

  parseRelativeTime (props?: Props) {
    props = props || this.props
    const { timestamp } = props
    const state = this.state || { timeAgo: undefined }
    const { relativeTime } = state
    const nextRelativeTime = timestamp ? this.formatDifference(timestamp) : undefined
    if (nextRelativeTime === relativeTime) return
    this.setState({ relativeTime: nextRelativeTime })
  }

  formatDifference (then: number, now: number = Date.now()): string {
    const suffix = now - then < 0 ? 'from now' : 'ago'
    const [readableDifference, unit] = this.parseDiffAndUnit(Math.abs(now - then))

    return `${readableDifference} ${unit} ${suffix}`
  }

  parseDiffAndUnit (timeDifference: number): [number | 'a' | 'an', string] {
    if (timeDifference < MINUTE) {
      const readableDifference = parseInt(timeDifference / 1000)
      const unit = readableDifference === 1 ? 'second' : 'seconds'
      return [readableDifference !== 1 ? readableDifference : 'a', unit]
    }
    if (timeDifference < HOUR) {
      const readableDifference = parseInt(timeDifference / 1000 / 60)
      const unit = readableDifference === 1 ? 'minute' : 'minutes'
      return [readableDifference !== 1 ? readableDifference : 'a', unit]
    }
    if (timeDifference < DAY) {
      const readableDifference = parseInt(timeDifference / 1000 / 60 / 60)
      const unit = readableDifference === 1 ? 'hour' : 'hours'
      return [readableDifference !== 1 ? readableDifference : 'an', unit]
    }
    const readableDifference = parseInt(timeDifference / 1000 / 60 / 60 / 24)
    const unit = readableDifference === 1 ? 'day' : 'days'
    return [readableDifference !== 1 ? readableDifference : 'a', unit]
  }

  render () {
    const { className } = this.props
    const { relativeTime } = this.state

    return (
      <div className={className}>{ relativeTime }</div>
    )
  }
}

export default RelativeTime
