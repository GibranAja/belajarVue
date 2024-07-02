<template>
  <h1 class="my-3">News</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-row class="my-3">
    <v-col col="2" v-for="data in newsData" :key="data.id">
      <v-card class="mx-auto">
        <v-img
          class="align-end text-white"
          height="400"
          :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
          cover
        >
        </v-img>

        <v-card-title>{{ truncateText(data.title, 100) }}</v-card-title>
        <v-card-subtitle class="pt-4"> {{ data.category.name }} </v-card-subtitle>

        <v-card-text>
          <div>{{ truncateText(data.content, 200) }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="info" variant="elevated" type="button" class="mb-3 ml-2">Read More</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useNewsStore } from '../stores/NewsStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

// Store
const newsStore = useNewsStore()

// Action
const { allNews } = newsStore

// State
const { newsData } = storeToRefs(newsStore)

const truncateText = (text, maxLength) => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

onMounted(() => {
  allNews()
})
</script>
