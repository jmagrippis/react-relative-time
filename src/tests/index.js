import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
const { describe, it } = global

import RelativeTime from '../index'

describe('RelativeTime', () => {
  it('should show a human readable time difference', () => {
    const wrapper = shallow(<RelativeTime timestamp={Date.now() - 5 * 1000} />)
    expect(wrapper.text()).to.be.equal('5 seconds ago')
  })
})
