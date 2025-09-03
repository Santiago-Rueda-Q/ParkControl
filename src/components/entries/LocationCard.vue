<template>
    <div class="rounded-2xl bg-slate-900/30 border border-slate-700 p-5">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-4">
            <i class="pi pi-map-marker text-sky-500"></i> Ubicación
        </h3>

        <div class="space-y-4">
        <div>
            <label class="block text-sm mb-1">Espacio de estacionamiento:</label>
            <Select
                v-model="selected"
                :options="slotOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                placeholder="Seleccionar espacio"
                filter
                filterPlaceholder="Buscar espacio..."
            >
            <template #value="{ value, placeholder }">
                <span v-if="!value">{{ placeholder }}</span>
                <span v-else>{{ value }}</span>
            </template>
            </Select>
        </div>

        <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
            <button
            v-for="opt in quick"
            :key="opt.value"
            type="button"
            class="px-4 py-2 rounded-lg border transition text-sm"
            :class="selected === opt.value
                ? 'border-emerald-600 bg-emerald-200 text-emerald-800'
                : 'border-emerald-300/70 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
            @click="selected = opt.value"
            >
            {{ opt.label }}
            </button>
        </div>

        <Button class="w-full" icon="pi pi-check-circle" label="Registrar Ingreso" @click="$emit('submit')" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'

const props = defineProps({
    modelValue: { type: String, default: '' },           
    grid: { type: Array, default: () => [] },             
})
const emit = defineEmits(['update:modelValue','submit'])

const selected = computed({
    get: () => props.modelValue,
    set: v  => emit('update:modelValue', v)
})

const slotOptions = computed(() =>
    props.grid.filter(c => !c.isOccupied).map(c => ({ label: c.code, value: c.code }))
)

const quick = computed(() => slotOptions.value.slice(0, 12))
</script>
