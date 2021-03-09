import objectAssign from './assign'

const merge = function ($vm, options) {
  const defaults = {}
  for (let i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default
    }
  }
  const _options = objectAssign({}, defaults, options)
  for (let i in _options) {
    $vm[i] = _options[i]
  }

  return $vm
}

export default merge
