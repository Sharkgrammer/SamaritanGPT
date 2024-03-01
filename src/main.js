import {createApp} from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css";
import "./assets/css/main.css";
import store from "./store";

let app = createApp(App);
app.use(store);
app.mount('#app')
