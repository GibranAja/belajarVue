<template>
    <h1>Update News</h1>
    <FormInputNews />
</template>

<script setup>
import FormInputNews from '../../components/news/FormInputNews.vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../../stores/NewsStore'
import { onMounted } from 'vue'

// Store
const newsStore = useNewsStore()

// Route
const newsRoute = useRoute()

// Action
const { updateHandling } = newsStore

onMounted(() => {
    updateHandling(newsRoute.params.id)
})
</script>