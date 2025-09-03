<template>
  <div class="space-y-6">
    <div class="h-12 flex items-center px-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700">
      <span class="font-semibold">Registrar Salida</span>
      <div class="ml-auto"><EntriesHeaderStats :stats="stats" /></div>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <div>
        <ExitSearch :active="active" @checkout="checkout" />
      </div>

      <div class="lg:col-span-2">
        <ParkedTable :rows="tableRows" @checkout="checkout" />
      </div>
    </div>

    <p v-if="message" class="text-sm text-rose-600">{{ message }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import di from '@/services/di'
import { DEFAULT_CATEGORIES } from '@/Domain/Slots/categories'

// Reutilizamos componentes ya existentes de 'entries'
import EntriesHeaderStats from '@/components/entries/EntriesHeaderStats.vue'
import ParkedTable from '@/components/entries/ParkedTable.vue'

// Nuevo componente local
import ExitSearch from '@/components/exts/ExitSearch.vue'

const active = ref([])
const stats  = ref([])
const message = ref('')

async function refresh() {
  const [sum, list] = await Promise.all([
    di.entriesService.summaryByType(),
    di.entriesService.listActive()
  ])
  stats.value = sum
  active.value = list
}

async function checkout(plate) {
  message.value = ''
  try {
    const removed = await di.entriesService.checkOutByPlate(plate)
    if (!removed) {
      message.value = 'No se encontró un ingreso activo con esa placa.'
    }
    await refresh()
  } catch (err) {
    message.value = (err && err.message) ? err.message : String(err)
  }
}

onMounted(refresh)

const mapLabel = Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c.key, c.label]))
const tableRows = computed(() =>
  active.value.map(e => ({ ...e, typeLabel: mapLabel[e.type] || e.type }))
)
</script>
