import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'   
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App).use(router)


app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})

import Button from 'primevue/button'
app.component('PButton', Button)

app.mount('#app')
