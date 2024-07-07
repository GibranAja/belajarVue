<template>
  <v-text-field
    v-model="localSearchQuery"
    :append-icon="appendIcon"
    :label="label"
    single-line
    hide-details
    @keyup.enter="emitSearch"
  ></v-text-field>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    searchQuery: {
        type: String,
        default: ''
    },
    appendIcon: {
        type: String,
        default: 'mdi-magnify'
    },
    label: {
        type: String,
        default: "Search..."
    }
})

const emit = defineEmits(['update:searchQuery', 'search'])

const localSearchQuery = ref(props.searchQuery)

watch(() => props.searchQuery, (newValue) => {
    localSearchQuery.value =  newValue
})

watch(localSearchQuery, (newValue) => {
    emit('update:searchQuery', newValue)
})

const emitSearch = () => {
    emit('search')
}
</script>