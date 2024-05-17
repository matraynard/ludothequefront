import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BigTitle from '../BigTitle.vue'

describe('BigTitle', () => {
  it('renders properly', () => {
    const wrapper = mount(BigTitle, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
