<template>
  <div v-if="!currentUser">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <h1>Halo {{ currentUser.name }}👋</h1>
    <p>Selamat Datang di sini</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

// Store
const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)
</script>