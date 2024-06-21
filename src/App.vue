<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/AuthStore';

const auth = useAuthStore()

onMounted (() => {
  auth.userHandler()
})
</script>
