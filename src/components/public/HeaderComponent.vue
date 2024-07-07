<template>
  <v-toolbar app class="bg-blue-lighten-4">
    <RouterLink :to="{ name: 'HomePublic' }">
      <span class="ml-15 text-h5 font-weight-black">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>
    <SearchBar
      v-model:modelValue="searchQuery"
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
    <h1 class="my-3">Search Results</h1>
    <v-divider class="border-opacity-100" color="info"></v-divider>
    
    <v-container class="my-3">
      <v-row v-if="filteredNews.length === 0">
        <v-col cols="12">
          <p>No results found.</p>
        </v-col>
      </v-row>
      <v-row v-for="data in filteredNews" :key="data.id">
        <v-col cols="12">
          <v-card class="mx-auto news-card" elevation="2">
            <v-row>
              <v-col cols="4">
                <v-img
                  class="align-end text-white"
                  height="250"
                  :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
                  cover
                ></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title class="font-weight-bold">{{ truncateText(data.title, 100) }}</v-card-title>
                <v-card-subtitle class="pt-2">{{ data.category.name }}</v-card-subtitle>
                <v-card-text>
                  <div>{{ truncateText(data.content, 200) }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="info" variant="elevated" type="button" @click="detailNews(data.id)">Read More</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-btn color="primary" @click="resetSearch" class="mt-4">Back</v-btn>
    </v-container>
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
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

defineEmits(['openClose'])

const auth = useAuthStore()
const newsStore = useNewsStore()
const router = useRouter()
const toast = useToast()

const searchQuery = ref('')
const searchPerformed = ref(false)
const filteredNews = ref([])

const searchNews = () => {
  searchPerformed.value = true
  filteredNews.value = newsStore.newsData.filter(news => 
    news.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    news.category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

const resetSearch = () => {
  searchPerformed.value = false
  searchQuery.value = ''
  filteredNews.value = []
}

const detailNews = (id) => {
  if (auth.currentUser) {
    router.push({ name: 'DetailNewsPublic', params: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  } else {
    toast.info("Kamu belum Login/Register", {
      position: "top-right",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false
    });
  }
}

const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
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

.news-card {
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}
</style>