<template>
  <v-app-bar app class="bg-blue-lighten-4">
    <RouterLink :to="{ name: 'HomePublic' }" class="d-flex align-center text-decoration-none">
      <span class="ml-16 text-h5 font-weight-black">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>

    <!-- Desktop menu -->
    <v-toolbar-items class="hidden-sm-and-down">
      <template v-if="!currentUser">
        <v-btn v-for="item in menuItems" :key="item.title" :to="{ name: item.pathName }" text>
          <v-icon start>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn v-for="item in currentUserMenu" :key="item.title" :to="{ name: item.pathName }" text>
          <v-icon start>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn color="red" icon="mdi-logout" variant="text" @click="auth.confirmLogout"></v-btn>
      </template>
    </v-toolbar-items>

    <!-- Mobile menu button -->
    <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
  </v-app-bar>

  <!-- Mobile menu drawer -->
  <v-navigation-drawer v-model="drawer" location="right" temporary class="hidden-md-and-up">
    <v-list>
      <template v-if="!currentUser">
        <v-list-item v-for="item in menuItems" :key="item.title" :to="{ name: item.pathName }">
          <v-list-item-title>
            <v-icon start>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item
          v-for="item in currentUserMenu"
          :key="item.title"
          :to="{ name: item.pathName }"
        >
          <v-list-item-title>
            <v-icon start>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="auth.confirmLogout">
          <v-list-item-title>
            <v-icon start color="red">mdi-logout</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

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
import { inject, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import DialogComponents from '../dashboard/DialogComponents.vue'

defineEmits(['openClose'])

const auth = useAuthStore()
const currentUser = inject('currentUser')
const drawer = ref(false)

const menuItems = [
  { title: 'Category', icon: 'mdi-newspaper', pathName: 'CategoryPublic' },
  { title: 'Login', icon: 'mdi-login', pathName: 'Login' }
]

const menuAdmin = [
  { title: 'Category', icon: 'mdi-newspaper', pathName: 'CategoryPublic' },
  { title: 'Dashboard', icon: 'mdi-view-dashboard', pathName: 'Home' }
]

const menuUser = [{ title: 'Category', icon: 'mdi-newspaper', pathName: 'CategoryPublic' }]

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
