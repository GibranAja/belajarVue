<template>
  <v-btn color="primary" class="mr-3 mt-3" @click="toggleSortOrder">
    Filter {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
  </v-btn>
</template>

<script setup>
import { ref } from 'vue'

// Filter Data
const sortOrder = ref('asc')

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>
