import { h } from '../../lib/min-vue.esm.js'

const HelloWorld = {
  name: "HelloWorld",
  setup() {},
  // TODO 第一个小目标
  // 可以在使用 template 只需要有一个插值表达式即
  // 可以解析 tag 标签
  // template: `
  //   <div>hi {{msg}}</div>
  //   需要编译成 render 函数
  // `,
  render() {
    return h(
      "div",
      { tId: "helloWorld" },
      `hello world: count: ${count.value}`
    );
  },
};

export default {
  name: "App",
  setup() {
    return {
      msg: 'vue'
    }
  },

  render() {
    window.self = this
    return h("div", { tId: 1, class: ['asda' ,'asdasd'], onClick(){
      console.log('click')
    }, onMousedown() {
      console.log('mousedown')
    }}, 'hello' + this.msg);
  },
};