import Vue from 'vue'
import SvgIcon from './svg-icon'

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svgs', true, /\.svg$/)
const requireAll = (requireContext) => {
  requireContext.keys().map(requireContext)
}
requireAll(req)
