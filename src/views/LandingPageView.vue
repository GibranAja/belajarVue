<template>
  <h1 class="my-3">News</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-container class="my-3">
    <v-row v-for="data in paginatedNews" :key="data.id">
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
              <v-card-title>{{ truncateText(data.title, 100) }}</v-card-title>
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
    <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @update:modelValue="changePage"
    class="custom-pagination mt-4"
    > </v-pagination>
  </v-container>
</template>

<script setup>
import { useNewsStore } from '../stores/NewsStore.js'
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

// Store
const newsStore = useNewsStore()
const router = useRouter()

// Action
const { allNews } = newsStore
const detailNews = (id) => {
  router.push({ name: 'DetailNewsPublic', params: { id: id } })
}

// State
const { newsData } = storeToRefs(newsStore)

// Paginatiom
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
</style>
