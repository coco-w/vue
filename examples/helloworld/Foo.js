import { h } from '../../lib/min-vue.esm.js'
export default {
  setup(props, { emit }) {
    console.log(props)
    props.count ++
    const fooClick = () => {
      console.log('foo click')
      emit('add-foo', 1, 2)
    }
    return {
      fooClick
    }
  },
  render() {
    return h('button', {
      onClick: this.fooClick
    }, 'foo')
  }
}