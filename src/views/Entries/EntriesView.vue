<template>
    <section class="space-y-6">
        <div class="flex items-center gap-2">
            <i class="pi pi-sign-in text-2xl text-sky-500"></i>
            <h1 class="text-2xl md:text-3xl font-bold">Registrar Ingreso</h1>
        </div>

        <EntriesHeaderStats :stats="summary" />

        <div class="grid lg:grid-cols-[1fr_420px] gap-6">
        <VehicleForm v-model="form" :clientOptions="clientOptions" />

        <LocationCard v-model="form.slotCode" :grid="grid" @submit="register" />
        </div>

        <ParkedTable :rows="active" />
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import di from '@/services/di'
import VehicleForm from '@/components/entries/VehicleForm.vue'
import LocationCard from '@/components/entries/LocationCard.vue'
import ParkedTable from '@/components/entries/ParkedTable.vue'
import EntriesHeaderStats from '@/components/entries/EntriesHeaderStats.vue'

const form = reactive({
    plate: '', type: 'car', vip: false, disability: false, clientId: null, slotCode: ''
})

const grid = ref([])            
const active = ref([])        
const summary = ref([])         
const clients = ref([])

const clientOptions = ref([])   
async function loadClients() {
    clients.value = await di.clientsService.list()
    entOptions.value = clients.value.map(c => ({ id: c.id, name: c.name }))
}

async function refresh() {
    grid.value = await di.mapService.getGrid()
    active.value = await di.entriesService.listActive()
    summary.value = await di.entriesService.summaryByType()
}

function normalizePlate(p) {
    return (p || '').toUpperCase()
}

async function register() {
    const plate = normalizePlate(form.plate)
    const valid = /^[A-Z]{3}-\d{3}$/.test(plate)
    if (!valid) { alert('Placa inválida. Formato esperado: AAA-123.'); return }
    if (!form.type || !form.slotCode) { alert('Faltan datos obligatorios (tipo, espacio).'); return }

    const clientName = clients.value.find(c => c.id === form.clientId)?.name || 'Cliente Ocasional'

    await di.entriesService.registerEntry({
        plate,
        type: form.type,
        slotCode: form.slotCode,
        vip: !!form.vip,
        disability: !!form.disability,
        client: clientName,
    })

    form.plate = ''
    form.slotCode = ''
    await refresh()
}

onMounted(async () => {
    await loadClients()
    await refresh()
})
</script>
