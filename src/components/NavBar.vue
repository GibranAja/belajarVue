<template>
  <v-app-bar color="blue-lighten-4" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="$emit('openClose')"></v-app-bar-nav-icon>

    <v-toolbar-title>Admin HNN</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn color="red" icon="mdi-logout" variant="text" @click="logOutUser"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';

defineEmits(['openClose'])

// Store
const auth = useAuthStore()
const { logOutUser } = auth
</script>