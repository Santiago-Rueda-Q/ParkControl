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
import InputText from 'primevue/inputtext'
import Select  from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'

app.use(ConfirmationService)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Paginator', Paginator)
app.component('PButton', Button)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Select', Select)
app.component('Checkbox', Checkbox)
app.component('DataTable', DataTable)
app.component('Column', Column)

import di from './services/di.js'
import { applyTheme } from './services/settings.service.js'

di.settingsService.load().then(s => applyTheme(s.theme))

app.mount('#app')
