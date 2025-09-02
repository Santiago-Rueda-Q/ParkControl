<template>
    <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
        <div class="px-5 py-3 border-b border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
            <i class="pi pi-list text-xl text-sky-600"></i>
            <h3 class="text-lg font-semibold">Vehículos Estacionados</h3>
        </div>

        <div class="p-5">
        <DataTable :value="rows" :rows="10" paginator responsiveLayout="scroll" class="w-full">
            <Column field="plate" header="Placa" />
            <Column field="typeLabel" header="Tipo" />
            <Column field="slotCode" header="Ubicación" />
            <Column header="Ingreso" :body="timeBody" />
            <Column header="Tiempo" :body="elapsedBody" />
            <Column field="client" header="Cliente" />
            <Column header="">
            <template #body="slotProps">
                <Button label="Salida" icon="pi pi-sign-out"
                        severity="danger" @click="$emit('checkout', slotProps.data.plate)" />
            </template>
            </Column>
        </DataTable>
        </div>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column    from 'primevue/column'
import Button    from 'primevue/button'

const props = defineProps({ rows: { type: Array, default: () => [] } })
defineEmits(['checkout'])

function timeBody(row) {
    const d = new Date(row.startedAtISO)
    return d.toLocaleString()
}
function elapsedBody(row) {
    const ms = Date.now() - new Date(row.startedAtISO).getTime()
    const m  = Math.floor(ms / 60000)
    const h  = Math.floor(m / 60)
    const mm = m % 60
    return `${h}h ${mm}m`
}
</script>
