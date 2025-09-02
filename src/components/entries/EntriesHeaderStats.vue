<template>
    <div class="flex flex-wrap gap-3">
        <div v-for="s in stats" :key="s.key" class="px-3 py-1.5 rounded-full bg-white shadow border border-slate-200 text-slate-700 flex items-center gap-2">
                <i :class="s.icon" class="text-sky-600"></i>
                <span class="font-medium">{{ s.occupied }}/{{ s.capacity }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({ stats: { type: Array, required: true } })
</script>
