<template>
  <div v-if="detailNews">
    <DetailNews :data="detailNews" :isUpdate="true" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../../stores/NewsStore.js'
import { storeToRefs } from 'pinia'
import DetailNews from '../../components/news/DetailNews.vue'

// Store
const newsStore = useNewsStore()

// State
const { detailNews } = storeToRefs(newsStore)

// Route
const route = useRoute()

// Action
const { detailHandling } = newsStore

onMounted(() => {
  detailHandling(route.params.id)
})
</script>
