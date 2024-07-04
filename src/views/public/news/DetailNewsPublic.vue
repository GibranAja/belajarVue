<template>
  <h1>Detail News</h1>

  <div v-if="detailNews">
    <DetailNewsComponent :data="detailNews" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../../../stores/NewsStore.js'
import { storeToRefs } from 'pinia'
import DetailNewsComponent from '../../../components/news/DetailNews.vue'

// Store and Route
const newsStore = useNewsStore()
const route = useRoute()

// State
const { detailNews } = storeToRefs(newsStore)

// Action
const { detailHandling } = newsStore

onMounted(() => {
  detailHandling(route.params.id)
})
</script>
