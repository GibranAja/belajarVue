<template>
  <v-btn color="primary" class="mr-3 mt-3" @click="toggleSortOrder">
    Filter {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
  </v-btn>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialSortOrder: {
    type: String,
    default: 'asc'
  },
  sortKey: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:sortOrder', 'sort'])

const sortOrder = ref(props.initialSortOrder)

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  emit('sort', { key: props.sortKey, order: sortOrder.value })
}

watch(sortOrder, (newValue) => {
  emit('update:sortOrder', newValue)
})
</script>