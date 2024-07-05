<template>
  <v-app-bar color="blue-lighten-4" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="$emit('openClose')"></v-app-bar-nav-icon>

    <v-toolbar-title>Admin HNN</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn color="red" icon="mdi-logout" variant="text" @click="auth.dialogLogout = true"></v-btn>
  </v-app-bar>

  <DialogComponents v-model="auth.dialogLogout">
    <template #title>Logout Confirmation</template>
    <template #content>
      <div class="text-h6 pa-3">Are you sure you want to logout?</div>
      <v-row>
        <v-col>
          <v-btn color="error" block @click="auth.logOutUser">Yes</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" block @click="auth.dialogLogout = false">No</v-btn>
        </v-col>
      </v-row>
    </template>
  </DialogComponents>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import DialogComponents from './dashboard/DialogComponents.vue'

defineEmits(['openClose'])

// Store
const auth = useAuthStore()
</script>