import React from 'react'
import { storiesOf } from '@kadira/storybook'

import RelativeTime from '../index'

storiesOf('RelativeTime', module)
  .add('Time in the seconds ago', () => (
    <RelativeTime timestamp={Date.now() - 30 * 1000} />
  ))
  .add('Time in the minutes ago', () => (
    <RelativeTime timestamp={Date.now() - 5 * 60 * 1000} />
  ))
  .add('Time an hour ago', () => (
    <RelativeTime timestamp={Date.now() - 60 * 60 * 1000} />
  ))
  .add('Time in the days ago', () => (
    <RelativeTime timestamp={Date.now() - 3 * 24 * 60 * 60 * 1000} />
  ))
  .add('Time in the seconds from now', () => (
    <RelativeTime timestamp={Date.now() + 30 * 1000} />
  ))
