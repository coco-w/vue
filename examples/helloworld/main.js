import { createApp } from '../../lib/min-vue.esm.js'
import App from "./App.js";

const rootContainer = document.querySelector("#root");
createApp(App).mount(rootContainer);