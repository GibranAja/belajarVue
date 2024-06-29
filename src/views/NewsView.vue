<template>
  <h1>Ini Halaman News</h1>
  <!-- Add button -->
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" size="large" icon="mdi-plus" @click="addNews()"></v-btn>
  </div>
  <v-row justify="center">
    <v-col v-for="data in newsData" :key="data.id" cols="4">
      <v-card>
        <v-img
          class="align-end text-white"
          height="300"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        >
          <v-card-title>{{ truncateText(data.title, 50) }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4"> {{ data.category.name }} </v-card-subtitle>

        <v-card-text>
          <div>{{ truncateText(data.content, 200) }}</div>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DialogComponents from '@/components/dashboard/DialogComponents.vue'

// Router
const router = useRouter()

// Store
const newsStore = useNewsStore()

// State
const { newsData } = storeToRefs(newsStore)
const dialogDelete = ref(false)
const selectedNews = ref({})

// Action
const { allNews, clearHandling, deleteHandling } = newsStore

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

onMounted(() => {
  allNews()
})

const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
</script>
