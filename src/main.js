import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'   
import 'flowbite'
import './style.css'

const app = createApp(App).use(router)


app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})

import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'

app.component('PButton', Button)
app.component('InputNumber', InputNumber)

app.mount('#app')
