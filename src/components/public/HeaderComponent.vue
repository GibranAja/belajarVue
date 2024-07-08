<template>
  <v-app-bar
    app
    :class="[
      appBarClass,
      { 'glassmorphism': isScrolled && !isHidden },
      { 'bg-blue-lighten-4': !isScrolled }
    ]"
    :style="{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }"
  >
    <RouterLink :to="{ name: 'HomePublic' }" class="d-flex align-center text-decoration-none">
      <span class="ml-16 text-h5 font-weight-black">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>

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

    <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
  </v-app-bar>

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
import { inject, computed, ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import DialogComponents from '../dashboard/DialogComponents.vue'

defineEmits(['openClose'])

const auth = useAuthStore()
const currentUser = inject('currentUser')
const drawer = ref(false)
const isScrolled = ref(false)
const isHidden = ref(false)
const lastScrollPosition = ref(0)

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

const appBarClass = computed(() => {
  return {
    'transition-transform': true,
    'duration-300': true,
  }
})

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  isScrolled.value = currentScrollPosition > 0
  
  if (currentScrollPosition < 0) {
    return
  }
  
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }

  isHidden.value = currentScrollPosition > lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}
</style>