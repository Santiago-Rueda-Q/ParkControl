<template>
    <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
        <div class="px-5 py-3 border-b border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
            <i class="pi pi-car text-xl text-sky-600"></i>
            <h3 class="text-lg font-semibold">Datos del Vehículo</h3>
        </div>

        <div class="p-5 space-y-4">
        <div>
            <label class="block text-sm mb-1"><i class="pi pi-id-card mr-2"></i>Placa:</label>
            <InputText v-model="local.plate" class="w-full" placeholder="AAA-123" />
        </div>

        <div>
            <label class="block text-sm mb-1"><i class="pi pi-car mr-2"></i>Tipo de Vehículo:</label>
            <Select
                v-model="local.type"
                :options="typeOptions"
                optionLabel="label" optionValue="key"
                class="w-full"
                placeholder="Seleccione tipo"
            />
        </div>

        <div class="space-y-2">
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
            <Dropdown
                v-model="local.client"
                :options="clients" class="w-full"
                placeholder="Seleccionar cliente (opcional)"
            />
        </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import InputText  from 'primevue/inputtext'
import Select   from 'primevue/select'
import Checkbox   from 'primevue/checkbox'

const props = defineProps({
    modelValue: { type: Object, required: true },
    typeOptions: { type: Array, required: true },
    clients: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const local = reactive({ ...props.modelValue })
watch(local, v => emit('update:modelValue', { ...v }), { deep: true })
</script>
