import { createRouter, createWebHistory } from 'vue-router'

const EntriesView = () => import('@/views/EntriesView.vue')
const ExitsView = () => import('@/views/ExitsView.vue')
const MapView = () => import('@/views/MapView.vue')
const ClientsView = () => import('@/views/ClientsView.vue')
const ReportsView = () => import('@/views/ReportsView.vue')
const RatesView = () => import('@/views/RatesView.vue')
const SlotsView = () => import('@/views/SlotsView.vue')
const SettingsView = () => import('@/views/SettingsView.vue')

const routes = [
{ path: '/', redirect: '/entries' },
{ path: '/entries', name: 'entries', component: EntriesView, meta: { labelEs: 'Ingresos' } },
{ path: '/exits', name: 'exits', component: ExitsView, meta: { labelEs: 'Salidas' } },
{ path: '/map', name: 'map', component: MapView, meta: { labelEs: 'Mapa' } },
{ path: '/clients', name: 'clients', component: ClientsView, meta: { labelEs: 'Clientes' } },
{ path: '/reports', name: 'reports', component: ReportsView, meta: { labelEs: 'Reportes' } },
{ path: '/rates', name: 'rates', component: RatesView, meta: { labelEs: 'Tarifas' } },
{ path: '/slots', name: 'slots', component: SlotsView, meta: { labelEs: 'Cupos' } },
{ path: '/settings', name: 'settings', component: SettingsView, meta: { labelEs: 'Ajustes' } },
]

const router = createRouter({
history: createWebHistory(),
routes,
})

export default router