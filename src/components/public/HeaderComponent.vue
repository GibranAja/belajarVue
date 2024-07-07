<template>
  <v-toolbar app class="bg-blue-lighten-4">
    <RouterLink :to="{ name: 'HomePublic' }">
      <span class="ml-15 text-h5 font-weight-black">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>
    <SearchBar
      v-model:searchQuery="searchQuery"
      label="Search News..."
      @search="searchNews"
    />

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

  <v-container v-if="searchPerformed">
    <h2>Search Results</h2>
    <v-row v-if="filteredNews.length > 0">
      <v-col v-for="item in filteredNews" :key="item.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.category.name }}</v-card-subtitle>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p v-else>No results found.</p>
  </v-container>

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
import { ref, inject, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useNewsStore } from '@/stores/NewsStore'
import DialogComponents from '../dashboard/DialogComponents.vue'
import SearchBar from '../SearchBar.vue'

defineEmits(['openClose'])

// Store
const auth = useAuthStore()
const newsStore = useNewsStore()

// SearchBar
const searchQuery = ref('')
const searchPerformed = ref(false)
const filteredNews = ref([])

const searchNews = () => {
  console.log('Searching for:', searchQuery.value)
  searchPerformed.value = true
  filteredNews.value = newsStore.newsData.filter(news => 
    news.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    news.category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  console.log('Filtered news:', filteredNews.value)
}

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

onMounted(async () => {
  if (!newsStore.newsData.length) {
    await newsStore.fetchNews()
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>