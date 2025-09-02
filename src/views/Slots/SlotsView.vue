<template>
    <div class="space-y-6">
        <div class="h-12 flex items-center px-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700">
            <span class="font-semibold">Sistema de Estacionamiento</span>
            <span class="mx-3 text-slate-400">/</span>
            <span class="text-slate-500">Cupos</span>
        </div>

        <SlotsConfig />
    </div>
</template>

<script setup>
import SlotsConfig from '@/components/SlotsConfig.vue'
</script>
