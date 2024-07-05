<template>
  <v-toolbar app class="bg-blue-lighten-4">
    <RouterLink :to="{ name: 'HomePublic' }">
      <span class="ml-15 text-h5 font-weight-black">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!currentUser">
      <v-btn flat v-for="item in menuItems" :key="item.title" :to="{ name: `${item.pathName}` }">
        <v-icon left>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn
        flat
        v-for="item in currentUserMenu"
        :key="item.title"
        :to="{ name: `${item.pathName}` }"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
      <v-btn color="red" icon="mdi-logout" variant="text" @click="auth.confirmLogout"></v-btn>
    </v-toolbar-items>
  </v-toolbar>

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
import { inject, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import DialogComponents from '../dashboard/DialogComponents.vue'

defineEmits(['openClose'])

// Store
const auth = useAuthStore()
// const { logOutUser } = auth

const currentUser = inject('currentUser')

const menuItems = [
  {
    title: 'Category',
    icon: 'mdi-newspaper',
    pathName: 'CategoryPublic'
  },
  {
    title: 'Login',
    icon: 'mdi-login',
    pathName: 'Login'
  }
]

const menuAdmin = [
  {
    title: 'Category',
    icon: 'mdi-newspaper',
    pathName: 'CategoryPublic'
  },
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    pathName: 'Home'
  }
]

const menuUser = [
  {
    title: 'Category',
    icon: 'mdi-newspaper',
    pathName: 'CategoryPublic'
  }
]

const currentUserMenu = computed(() => {
  return currentUser.value?.isAdmin ? menuAdmin : menuUser
})
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>
