<template>
    <div class="flex items-center gap-2">
        <InputText v-model="model" placeholder="Buscar cliente..." />
        <Button icon="pi pi-search" @click="$emit('search', model)" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue','search'])
const model = computed({
    get: () => props.modelValue,
    set: v  => emit('update:modelValue', v)
})
</script>
