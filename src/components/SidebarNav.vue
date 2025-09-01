<template>
    <nav class="flex flex-col h-full">
        <div class="flex items-center gap-2 px-4 py-5">
            <div class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white font-bold">P</div>
            <div class="text-lg font-semibold text-white">ParkControl</div>
        </div>

        <ul class="flex-1 px-2 space-y-1">
            <li v-for="item in items" :key="item.nameEn">
            <NavItem :item="item" />
            </li>
        </ul>

        <div class="px-4 py-4 text-center text-xs text-gray-400 border-t border-gray-700">
        Sistema v2.1.0
        </div>
    </nav>
</template>


<script setup>
import NavItem from './NavItem.vue'


const props = defineProps({
items: { type: Array, required: true },
})
</script>


<style scoped>
</style>