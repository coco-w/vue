import { h } from '../../lib/min-vue.esm.js'
import Foo from './Foo.js';

export default {
  name: "App",
  setup() {
    return {
      msg: 'vue'
    }
  },

  render() {
    return h("div", { tId: 1, class: ['asda' ,'asdasd'], onClick(){
      console.log('click')
    }, onMousedown() {
      console.log('mousedown')
    }}, [h("div", {}, 'hello' + this.msg), h(Foo, {
      count: 1,
      'onAddFoo': (a, b) => {
        console.log('app add', a, b)
      }
    })]);
  },
};