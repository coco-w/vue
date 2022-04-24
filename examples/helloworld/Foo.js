import { h } from '../../lib/min-vue.esm.js'
export default {
  setup(props) {
    console.log(props)
    props.count ++
  },
  render() {
    return h('div', {}, 'foo: ' + this.count)
  }
}