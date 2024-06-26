<template>
  <h1>Ini Halaman News</h1>
  <!-- Add button -->
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" size="large" icon="mdi-plus" :to="{ name: 'CreateNews' }"></v-btn>
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useNewsStore } from '@/stores/NewsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Store
const newsStore = useNewsStore()

// State
const { newsData } = storeToRefs(newsStore)

// Action
const { allNews } = newsStore
const detail = (id) => {
  router.push({ name: 'DetailNews', params: { id: id } })
}

onMounted(() => {
  allNews()
})

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
</script>
