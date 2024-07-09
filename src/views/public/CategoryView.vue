<template>
  <v-container>
    <h1 class="my-16">News Categories</h1>
    <v-row>
      <v-col v-for="category in categories" :key="category.id" cols="12" sm="6" md="4" class="mb-4">
        <v-card class="mx-auto h-100" max-width="330">
          <v-card-title class="text-h6 font-weight-bold">{{ category.name }}</v-card-title>
          <div v-if="$vuetify.display.smAndUp">
            <v-card-text>
              {{ category.description }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange-lighten-2" @click="navigateToNews(category.name)"
                >See News</v-btn
              >
            </v-card-actions>
          </div>

          <div v-else>
            <v-card-actions>
              <v-btn color="orange-lighten-2" @click="navigateToNews(category.name)"
                >See News</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                :icon="openCategoryId === category.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="toggleShow(category.id)"
              ></v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="openCategoryId === category.id">
                <v-divider></v-divider>
                <v-card-text>
                  {{ category.description }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCategoryStore } from '@/stores/CategoryStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const categoryStore = useCategoryStore()
const router = useRouter()

const categories = ref([])
const openCategoryId = ref(null)

onMounted(async () => {
  await categoryStore.readCategory()
  categories.value = categoryStore.categories
})

const navigateToNews = (categoryName) => {
  router.push({ name: 'CategoryNews', params: { categoryName } });
}

const toggleShow = (categoryId) => {
  if (openCategoryId.value === categoryId) {
    openCategoryId.value = null
  } else {
    openCategoryId.value = categoryId
  }
}
</script>
