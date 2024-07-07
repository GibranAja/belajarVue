<template>
  <h1 class="my-3">News</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-container class="my-3">
    <v-row v-for="data in paginatedNews" :key="data.id">
      <v-col cols="12">
        <v-card class="mx-auto news-card" elevation="2">
          <v-row no-gutters>
            <v-col cols="12" sm="4" md="4">
              <v-img
                class="align-end text-white"
                height="250"
                :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-card-title class="font-weight-bold title-text">
                <span class="d-none d-sm-inline">{{ truncateText(data.title, 100) }}</span>
                <span class="d-inline d-sm-none ">{{ data.title }}</span>
              </v-card-title>
              <v-card-subtitle class="pt-2 d-none d-sm-flex">{{ data.category.name }}</v-card-subtitle>
              <v-card-text class="d-none d-sm-flex">
                <div>{{ truncateText(data.content, 50) }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="info" variant="elevated" type="button" @click="detailNews(data.id)">
                  <span class="d-none d-sm-inline">Read More</span>
                  <span class="d-inline d-sm-none">Read</span>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @update:model-value="changePage"
      class="custom-pagination mt-4"
    > </v-pagination>
  </v-container>
</template>

<script setup>
import { useNewsStore } from '../stores/NewsStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'

// Store
const newsStore = useNewsStore()
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

// Action
const { allNews } = newsStore
const detailNews = (id) => {
  if (authStore.currentUser) {
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

// State
const { newsData } = storeToRefs(newsStore)

// Pagination
const newsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => {
  return newsData.value && newsData.value.length > 0
    ? Math.ceil(newsData.value.length / newsPerPage)
    : 0
})

const paginatedNews = computed(() => {
  if (!newsData.value || newsData.value.length === 0) return []
  const start = (currentPage.value - 1) * newsPerPage
  const end = start + newsPerPage
  return newsData.value.slice(start, end)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

onMounted(() => {
  allNews()
})
</script>

<style scoped>
.news-card {
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.custom-pagination {
  --v-theme-overlay-multiplier: 0;
}

:deep(.v-pagination__item) {
  color: blue !important;
}

:deep(.v-pagination__item--active) {
  background-color: lightblue !important;
  color: white !important;
}

.title-text {
  font-size: 1.5rem;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-height: 3.6em; 
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.content-text {
  overflow: hidden;
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

@media (max-width: 600px) {
  .title-text {
    font-size: 1.2rem;
    max-height: 4.32em;
  }
  .v-card-title {
    padding: 12px 16px 0;
  }
  .v-card-actions {
    padding: 0 16px 16px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .title-text {
    font-size: 1.3rem;
    max-height: 4.68em;
  }
}
</style>