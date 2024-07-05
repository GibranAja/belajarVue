<template>
  <h1>Ini Halaman News</h1>
  <!-- Add button -->
  <div class="d-flex justify-end my-6">
    <SortFilter 
      v-model:sortOrder="sortOrder"
      :sortKey="'title'"
      @sort="handleSort"
    />
    <v-btn color="primary" size="large" icon="mdi-plus" @click="addNews()"></v-btn>
  </div>
  <v-row justify="center">
    <v-col v-for="data in sortedNewsData" :key="data.id" cols="12" sm="6" md="4">
      <v-card class="news-card">
        <v-img
          class="align-end text-white"
          height="200"
          :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
          cover
        >
        </v-img>

        <v-card-title class="newsTitle text-truncate">{{ data.title }}</v-card-title>
        <v-card-subtitle class="pt-2"> {{ data.category.name }} </v-card-subtitle>

        <v-card-text class="content-text">
          {{ truncateText(data.content, 100) }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" @click="detail(data.id)">Detail</v-btn>
          <v-btn color="secondary" @click="update(data.id)">Edit</v-btn>
          <v-btn color="red" @click="deleteData(data)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <DialogComponents v-model="dialogDelete">
    <template #title> Delete News </template>
    <template #content>
      <div class="text-h6 text-error pa-3">
        Are you sure you want to delete "{{ truncateText(selectedNews.title, 17) }}"?
      </div>
      <v-row>
        <v-col>
          <v-btn color="error" block @click="confirmDelete">Yes</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" block @click="dialogDelete = false">No</v-btn>
        </v-col>
      </v-row>
    </template>
  </DialogComponents>
</template>

<script setup>
import { useNewsStore } from '@/stores/NewsStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref,  } from 'vue'
import { useRouter } from 'vue-router'
import DialogComponents from '@/components/dashboard/DialogComponents.vue'
import SortFilter from '@/components/dashboard/FilterComponents.vue'

// Router
const router = useRouter()

// Store
const newsStore = useNewsStore()

// State
const { newsData } = storeToRefs(newsStore)
const dialogDelete = ref(false)
const selectedNews = ref({})

// Sort
const sortOrder = ref('asc')
const sortedNewsData = ref([])

// Action
const { allNews, clearHandling, deleteHandling } = newsStore

const handleSort = ({ key, order }) => {
  sortedNewsData.value = [...newsData.value].sort((a, b) => {
    if (order === 'asc') {
      return a[key].localeCompare(b[key])
    } else {
      return b[key].localeCompare(a[key])
    }
  })
}

const detail = (id) => {
  router.push({ name: 'DetailNews', params: { id: id } })
}

const update = (id) => {
  router.push({ name: 'DetailUpdate', params: { id: id } })
}

const addNews = () => {
  router.push({ name: 'CreateNews' })
  clearHandling()
}

const deleteData = (news) => {
  selectedNews.value = news
  dialogDelete.value = true
}

const confirmDelete = async () => {
  await deleteHandling(selectedNews.value.id)
  dialogDelete.value = false
  selectedNews.value = {}
}

onMounted(async () => {
  await allNews()
  sortedNewsData.value = [...newsData.value]
})

const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
</script>

<style scoped>
/* .newsTitle {
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
} */

.news-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.newsTitle {
  height: 64px;
  overflow: hidden;
}

.content-text {
  flex-grow: 1;
  overflow: hidden;
}
</style>