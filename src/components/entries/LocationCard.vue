<template>
    <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
        <div class="px-5 py-3 border-b border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
            <i class="pi pi-map-marker text-xl text-sky-600"></i>
            <h3 class="text-lg font-semibold">Ubicación</h3>
        <div class="ml-auto"><slot name="stats" /></div>
        </div>

        <div class="p-5 space-y-4">
        <div>
            <label class="block text-sm mb-1"><i class="pi pi-parking mr-2"></i>Espacio de estacionamiento:</label>
            <Select
                v-model="selected"
                :options="slots"
                placeholder="Seleccionar espacio"
                class="w-full"
            />
        </div>

        <div class="grid grid-cols-4 sm:grid-cols-6 gap-4">
            <button
                v-for="code in quickGrid"
                :key="code.value"
                type="button"
                @click="selected = code.value"
                class="inline-flex items-center justify-center px-3 py-2 rounded-lg border text-sm transition"
                :class="selected === code.value
                    ? 'border-emerald-600 bg-emerald-200 text-emerald-800'
                    : 'border-emerald-300/70 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
            >
                {{ code.label }}
            </button>
        </div>

        <div class="pt-2">
            <Button class="w-full" icon="pi pi-check-circle" label="Registrar Ingreso" @click="onSubmit" />
        </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Select from 'primevue/Select'
import Button from 'primevue/button'

const props = defineProps({
    modelValue: { type: String, default: '' },
    slots: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue','submit'])

const selected = computed({
    get: () => props.modelValue,
    set: v   => emit('update:modelValue', v)
})

const quickGrid = computed(() => props.slots.slice(0, 8))

function onSubmit() { emit('submit') }
</script>
