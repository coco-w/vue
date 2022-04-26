import { h, createTextVnode } from "../../lib/min-vue.esm.js";
import { Foo } from "./Foo.js";

// Fragment 以及 Text
export default {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    // object key
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h("p", {}, "header" + age),
        footer: () => h("p", {}, "footer"),
      }
    );
    // 数组 vnode
    // const foo = h(Foo, {}, h("p", {}, "123"));
    return h("div", {}, [app, foo, createTextVnode('ni hao')]);
  },

  setup() {
    return {};
  },
};