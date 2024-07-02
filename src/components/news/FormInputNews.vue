<template>
  <div class="mt-8">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="90%" rounded="lg">
      <v-form v-model="formInput" @submit.prevent="handleSubmit()">
        <v-text-field
          density="compact"
          placeholder="News Title"
          class="my-5"
          variant="outlined"
          v-model="news.title"
          :rules="titleRules"
        ></v-text-field>

        <v-textarea
          density="compact"
          label="News Content"
          class="my-5"
          variant="outlined"
          v-model="news.content"
          :rules="contentRules"
        ></v-textarea>

        <div v-if="categories">
          <v-select
            class="my-5"
            :rules="categoryRules"
            :items="categories"
            v-model="news.category"
            item-title="name"
            item-value="id"
            label="Category"
            return-object
            variant="outlined"
          >
          </v-select>
        </div>

        <v-btn
          :disable="!formInput"
          class="mb-8"
          type="submit"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          Submit
        </v-btn>
        <v-card-actions>
          <v-btn
            class="mb-8"
            type="submit"
            color="error"
            size="large"
            variant="elevate"
            block
            @click="$router.go(-1)"
            >Back</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { useCategoryStore } from '../../stores/CategoryStore.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/NewsStore.js'

// Store
const categoryStore = useCategoryStore()
const newsStore = useNewsStore()

// State
const { categories } = storeToRefs(categoryStore)
const { news, formInput } = storeToRefs(newsStore)

// Action
const { readCategory } = categoryStore
const { handleSubmit } = newsStore

// Validation
const titleRules = [
  (value) => {
    if (value) return true
    return 'Required Title'
  }
]

const contentRules = [
  (value) => {
    if (value) return true
    return 'Content must be filled'
  }
]

const categoryRules = [
  (value) => {
    if (value) return true
    return 'Category must selected'
  }
]

onMounted(() => {
  readCategory()
})
</script>