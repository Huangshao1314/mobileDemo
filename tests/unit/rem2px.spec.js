import { expect } from 'chai'
import rem2px from '../../tools/rem2px'

describe('2rem换算为20px', () => {
  it('renders props.msg when passes', () => {
    expect(rem2px('2rem')).to.equal('20px')
  })
})
