import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import './assets/main.css'
import axios from 'axios';

//Vue.prototype.$http = axios; //in Vue3 is replaced by app.config.globalProperties.$axios = axios; (source : https://stackoverflow.com/questions/65184107/how-to-use-vue-prototype-or-global-variable-in-vue-3)

const app = createApp(App)
app.config.globalProperties.$axios = axios;

app.use(router)

app.mount('#app')
