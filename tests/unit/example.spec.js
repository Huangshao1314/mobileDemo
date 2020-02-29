import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWord.vue'

describe('HelloWord.vue', () => {
  it('renders props.msg when passes', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: {msg}
    })
    expect(wrapper.text()).to.include(msg)
  })
})
