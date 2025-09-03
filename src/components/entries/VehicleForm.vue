<template>
    <div class="rounded-2xl bg-slate-900/30 border border-slate-700 p-5">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-4">
            <i class="pi pi-car text-sky-500"></i> Datos del Vehículo
        </h3>

        <div class="space-y-4">
        <div>
            <label class="block text-sm mb-1"><i class="pi pi-id-card mr-2"></i>Placa:</label>
            <InputText
                v-model="local.plate"
                class="w-full"
                placeholder="AAA-123"
                @input="formatPlate"
            />
            <p v-if="plateError" class="text-xs mt-1 text-rose-400">
            {{ plateError }}
            </p>
        </div>

        <div>
            <label class="block text-sm mb-1"><i class="pi pi-car mr-2"></i>Tipo de Vehículo:</label>
            <Select
                v-model="local.type"
                :options="typeOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
            />
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
                <Checkbox v-model="local.vip" :binary="true" inputId="vip" />
                <label for="vip">Cliente VIP</label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox v-model="local.disability" :binary="true" inputId="dis" />
                <label for="dis">Espacio para discapacidad</label>
            </div>
        </div>

        <div>
            <label class="block text-sm mb-1"><i class="pi pi-user mr-2"></i>Cliente:</label>
            <Select
                v-model="local.clientId"
                :options="clientOptions"
                optionLabel="name"
                optionValue="id"
                filter
                filterPlaceholder="Buscar cliente..."
                showClear
                class="w-full"
                placeholder="Seleccionar cliente (opcional)"
            />
        </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Checkbox  from 'primevue/checkbox'
import Select    from 'primevue/select'

const props = defineProps({
    modelValue: { type: Object, default: () => ({}) },
    clientOptions: { type: Array, default: () => [] } 
})
const emit = defineEmits(['update:modelValue'])

const local = reactive({
    plate: '', type: 'car', vip: false, disability: false, clientId: null,
    ...props.modelValue
})

watch(() => props.modelValue, (v) => Object.assign(local, v || {}), { deep: true })
watch(local, (v) => emit('update:modelValue', { ...v }), { deep: true })

const typeOptions = [
    { label: 'Carros',       value: 'car' },
    { label: 'Motos',        value: 'motorcycle' },
    { label: 'Bicicletas',   value: 'bicycle' },
]

function formatPlate() {
    let raw = (local.plate || '').toUpperCase().replace(/[^A-Z0-9-]/g, '')
    raw = raw.replace(/-/g, '')
    const letters = raw.slice(0, 3).replace(/[^A-Z]/g, '')
    const digits  = raw.slice(3, 6).replace(/[^0-9]/g, '')
    local.plate = letters + (letters.length === 3 ? '-' : '') + digits
}

const plateError = computed(() => {
    if (!local.plate) return null
    return /^[A-Z]{3}-\d{3}$/.test(local.plate) ? null : 'Formato esperado: AAA-123 (falta separación o caracteres inválidos)'
})
</script>
