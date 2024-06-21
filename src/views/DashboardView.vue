<template>
  <h1>Halo {{ currentUser.name }}👋</h1>
  <p>Selamat Datang di sini</p>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

// Store
const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)
</script>