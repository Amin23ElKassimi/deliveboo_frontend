import { createApp } from 'vue'
import { router } from './router';
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';

createApp(App).use(router).mount('#app');
