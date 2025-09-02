<template>
    <div class="space-y-6">
        <div class="h-12 flex items-center px-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700">
            <span class="font-semibold">Registrar Ingreso</span>
        <div class="ml-auto"><EntriesHeaderStats :stats="stats" /></div>
        </div>

        <div class="grid lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2">
            <VehicleForm v-model="form" :type-options="typeOptions" :clients="clients" />
        </div>

        <div>
            <LocationCard v-model="form.slotCode" :slots="slotOptions" @submit="register">
            <template #stats>
                <EntriesHeaderStats :stats="stats" />
            </template>
            </LocationCard>
        </div>
        </div>

        <ParkedTable :rows="tableRows" @checkout="checkout" />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import di from '@/services/di'
import { DEFAULT_CATEGORIES } from '@/Domain/Slots/categories'

import VehicleForm from '@/components/entries/VehicleForm.vue'
import LocationCard from '@/components/entries/LocationCard.vue'
import ParkedTable from '@/components/entries/ParkedTable.vue'
import EntriesHeaderStats from '@/components/entries/EntriesHeaderStats.vue'

const form = reactive({
    plate: '', type: 'car', vip: false, disability: false,
    client: null, slotCode: ''
})

const clients = ref(['Cliente Ocasional','Santiago Rueda']) 
const stats = ref([])
const active = ref([])

const typeOptions = DEFAULT_CATEGORIES.map(c => ({ key: c.key, label: c.label }))
const slotOptions = ['A1','A2','A4','A5','A6','M1','M2','M3'] 

async function refresh() {
    stats.value = await di.entriesService.summaryByType()
    active.value = await di.entriesService.listActive()
}

async function register() {
    try {
        await di.entriesService.registerEntry({ ...form })
        form.plate = ''; form.slotCode = ''
        await refresh()
        alert('Ingreso registrado.')
    } catch (e) {
        alert(e.message || 'No se pudo registrar el ingreso.')
    }
}

async function checkout(plate) {
    await di.entriesService.checkOutByPlate(plate)
    await refresh()
}

onMounted(refresh)

const mapLabel = Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c.key, c.label]))
const tableRows = computed(() =>
    active.value.map(e => ({ ...e, typeLabel: mapLabel[e.type] || e.type }))
)
</script>
