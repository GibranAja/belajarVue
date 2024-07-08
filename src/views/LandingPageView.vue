<template>
  <h1 class="mt-16 mb-3">News</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-container class="my-3" fluid>
    <v-row v-for="data in paginatedNews" :key="data.id">
      <v-col cols="12">
        <v-card class="mx-auto news-card" elevation="2">
          <v-row no-gutters>
            <v-col cols="12" sm="5" md="4">
              <v-img
                class="news-image"
                :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" sm="7" md="8">
              <div class="d-flex flex-column h-100">
                <v-card-title class="font-weight-bold title-text">
                  {{ truncateText(data.title, 100) }}
                </v-card-title>
                <v-card-subtitle class="pt-2">{{ data.category.name }}</v-card-subtitle>
                <v-card-text>
                  <div class="content-text">{{ truncateText(data.content, 300) }}</div>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions class="button-container">
                  <v-btn color="info" variant="elevated" type="button" @click="detailNews(data.id)">
                    Read More
                  </v-btn>
                </v-card-actions>
              </div>
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
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { useNewsStore } from '../stores/NewsStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
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
      window.scrollTo(0, 0)
    })
  } else {
    toast.info('Kamu belum Login/Register', {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false
    })
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.news-card:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.news-image {
  height: 100%;
  min-height: 250px;
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

.content-text {
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.button-container {
  padding: 16px;
}

.title-text {
  font-size: 1.5rem;
  line-height: 1.4;
  max-height: 4.2em;
  overflow: hidden;
}

@media (max-width: 600px) {
  .title-text {
    font-size: 1.2rem;
    max-height: 4.32em;
  }
  .v-card-title {
    padding: 16px 16px 8px;
  }
  .v-card-actions {
    padding: 16px;
  }
  .v-col {
    display: flex;
    flex-direction: column;
  }
  .v-col > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .news-image {
    min-height: 200px;
  }
}

/* @media (min-width: 601px) and (max-width: 960px) {
  .title-text {
    font-size: 1.3rem;
    max-height: 3.9em;
  }
} */
</style>