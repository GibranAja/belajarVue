<template>
  <BackButton />
  <h1 class="mt-11 mb-3">News for Category: {{ $route.params.categoryName }}</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-container class="my-3">
    <template v-if="categoryNews.length > 0">
      <v-row v-for="data in paginatedNews" :key="data.id">
        <v-col cols="12">
          <v-card class="mx-auto news-card" elevation="2">
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4">
                <v-img
                  class="align-end text-white news-image"
                  height="250"
                  :src="
                    data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`
                  "
                  cover
                ></v-img>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <div class="d-flex flex-column h-100">
                  <v-card-title class="font-weight-medium">
                    <span class="d-none d-sm-inline">{{ truncateText(data.title, 50) }}</span>
                    <span class="d-inline d-sm-none full-title">{{ data.title }}</span>
                  </v-card-title>
                  <v-card-subtitle class="pt-2 d-none d-sm-flex">{{
                    data.category.name
                  }}</v-card-subtitle>
                  <v-card-text class="d-none d-sm-flex">
                    <div>{{ truncateText(data.content, 400) }}</div>
                  </v-card-text>
                  <div class="flex-grow-1"></div>
                  <v-card-actions class="button-container">
                    <v-btn
                      color="info"
                      variant="elevated"
                      type="button"
                      @click="detailNews(data.id)"
                    >
                      <span class="d-none d-sm-inline">Read More</span>
                      <span class="d-inline d-sm-none">Read</span>
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
    </template>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info" prominent border="start" class="mt-4 text-h5 floating-alert">
          Coming Soon
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useNewsStore } from '../../stores/NewsStore.js'
import { useAuthStore } from '../../stores/AuthStore.js'
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import BackButton from '../../components/news/BackButton.vue'

const newsStore = useNewsStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const { allNews } = newsStore
const { newsData } = storeToRefs(newsStore)

const categoryNews = ref([])

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

const newsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => {
  return categoryNews.value && categoryNews.value.length > 0
    ? Math.ceil(categoryNews.value.length / newsPerPage)
    : 0
})

const paginatedNews = computed(() => {
  if (!categoryNews.value || categoryNews.value.length === 0) return []
  const start = (currentPage.value - 1) * newsPerPage
  const end = start + newsPerPage
  return categoryNews.value.slice(start, end)
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

onMounted(async () => {
  await allNews()
  filterNewsByCategory()
})

watch(() => route.params.categoryName, filterNewsByCategory)

function filterNewsByCategory() {
  categoryNews.value = newsData.value.filter(
    (news) => news.category.name === route.params.categoryName
  )
}
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

.content-text {
  overflow: hidden;
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

.button-container {
  padding: 16px 16px 16px;
}

@media (max-width: 600px) {
  .news-card {
    width: 100%;
  }

  .news-image {
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .title-text {
    font-size: 1.2rem;
    max-height: 4.32em;
  }

  .v-card-title {
    padding: 12px 16px 0;
  }

  .v-card-actions {
    padding: 16px 16px 16px;
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
}

.full-title {
  white-space: normal !important;
  word-break: break-word !important;
  font-size: 16px !important;
  line-height: 1.3 !important;
}

.v-card-title {
  line-height: 1.3 !important;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating-alert {
  animation: float 3s ease-in-out infinite;
}
</style>
