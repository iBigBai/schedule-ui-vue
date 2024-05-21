import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router.js";
import Pinia from "./pinia.js";

let app = createApp(App);
app.use(router);
//全局使用pinia
app.use(Pinia);
app.mount('#app')
