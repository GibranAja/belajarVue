<!-- SearchBar.vue -->
<template>
    <v-text-field
      :model-value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :label="label"
      append-icon="mdi-magnify"
      @keyup.enter="$emit('search')"
    ></v-text-field>
  </template>
  
  <script setup>
  defineProps({
    modelValue: String,
    label: String,
  })
  defineEmits(['update:modelValue', 'search'])
  </script>