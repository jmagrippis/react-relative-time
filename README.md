# React Relative Time Component

React Relative Time Component takes a [timestamp] and displays the live-updating, human readable difference.

## Usage

Bring it in via npm:

```
npm install --save react-relative-time
```

Use it in your other [React] components:

```javascript
import React from 'react'
import RelativeTime from 'react-relative-time'

export const MessageBox = ({ message, timestamp }) => (
  <div>{message}</div>
  <RelativeTime timestamp={timestamp} />
)
```

## Output

```javascript
<RelativeTime timestamp={Date.now - 30 * 1000} /> // 30 seconds ago
<RelativeTime timestamp={Date.now - 5 * 60 * 1000} /> // 5 minutes ago
<RelativeTime timestamp={Date.now - 60 * 60 * 1000} /> // an hour ago

<RelativeTime timestamp={Date.now + 45 * 1000} /> // 45 seconds from now
```
[timestamp]: https://en.wikipedia.org/wiki/Unix_time
[React]: https://facebook.github.io/react/
