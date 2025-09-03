<template>
  <div class="p-6">
    <!-- Card estilo Vehículos Estacionados -->
    <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6">
      
      <!-- Título -->
      <h2 class="text-xl font-bold flex items-center gap-2 mb-6">
        <i class="fas fa-sign-out-alt text-green-400"></i>
        Registrar Salida
      </h2>

      <!-- Buscar Vehículo -->
      <div class="mb-6">
        <label class="block font-semibold mb-2">Buscar Vehículo</label>
        <div class="flex">
          <!-- Input -->
          <input
            v-model="plate"
            type="text"
            placeholder="Ej. ABC123"
            class="w-full bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <!-- Botón con lupa -->
          <button
            @click="emitCheckout"
            class="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 flex items-center justify-center"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
        <p v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</p>
      </div>

      <!-- Factura -->
      <div class="border-t border-gray-700 pt-6 text-center text-gray-400">
        <i class="fas fa-receipt text-4xl mb-2"></i>
        <p>Busque un vehículo para generar la factura</p>
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-2 mt-6">
        <button
          @click="emitCheckout"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
        >
          <i class="fas fa-check-circle mr-1"></i> Procesar Salida
        </button>
        <button
          class="bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
        >
          <i class="fas fa-print mr-1"></i> Imprimir
        </button>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'

const plate = ref('')
const error = ref('')

const emit = defineEmits(['checkout'])

function emitCheckout() {
  if (!plate.value) {
    error.value = 'Debes ingresar una placa'
    return
  }
  error.value = ''
  emit('checkout', plate.value.toUpperCase())
  plate.value = ''
}
</script>
