<template>
  <h1 class="my-3">News</h1>
  <v-divider class="border-opacity-100" color="info"></v-divider>
  <v-container class="my-3">
    <v-row v-for="data in newsData" :key="data.id">
      <v-col cols="12">
        <v-card class="mx-auto">
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
                <v-btn color="info" variant="elevated" type="button">Read More</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
