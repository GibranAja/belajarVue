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
          v-model.trim="news.content"
          :rules="contentRules"
          :counter="maxChars"
          :maxlength="maxChars"
          label="News Content"
          placeholder="Enter your news content here..."
          hint="Press Shift + Enter for new line"
          persistent-hint
          auto-grow
          rows="5"
          row-height="20"
          class="my-5"
          density="comfortable"
          variant="outlined"
          @keydown.enter.prevent
          @keydown.shift.enter.exact="newLine"
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
  // (value) => {
  //   if (value) return true
  //   return 'Content must be filled'
  // }
  (v) => !!v || 'Content must be filled',
  (v) => v.length >= 50 || 'Content should be at least 50 characters long'
]

const categoryRules = [
  (value) => {
    if (value) return true
    return 'Category must selected'
  }
]

const maxChars = 10000 // Sesuaikan dengan kebutuhan Anda

const newLine = (event) => {
  const textarea = event.target
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const value = textarea.value
  textarea.value = value.substring(0, start) + '\n' + value.substring(end)
  textarea.selectionStart = textarea.selectionEnd = start + 1
}

onMounted(() => {
  readCategory()
})
</script>

<style scoped>
.v-textarea :deep(textarea) {
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
