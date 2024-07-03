<template>
  <h1>Ini Halaman Category</h1>
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" class="mr-3 mt-3" @click="toggleSortOrder">
      Filter {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
    </v-btn>
    <v-btn color="primary" icon="mdi-plus" size="large" @click="addData()"></v-btn>
  </div>

  <DialogComponents v-model="dialog">
    <template #title>
      <div>
        {{ category.isUpdate ? 'Update Category' : 'Add Category' }}
      </div>
    </template>
    <template #content>
      <v-form v-model="form" @submit.prevent="onSubmitData">
        <v-text-field
          class="mb-1"
          :rules="nameRules"
          v-model="category.name"
          label="Name"
        ></v-text-field>
        <v-textarea
          class="mb-1"
          :rules="descriptionRules"
          v-model="category.description"
          label="Description"
        ></v-textarea>
        <v-btn
          block
          :disabled="!form"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          >{{ category.isUpdate ? 'Update' : 'Add' }}</v-btn
        >
      </v-form>
    </template>
  </DialogComponents>

  <DialogComponents v-model="dialogDetail">
    <template #title>{{ category.name }}</template>
    <template #content>{{ category.description }}</template>
  </DialogComponents>

  <DialogComponents v-model="dialogDelete">
    <template #title> Delete Category </template>
    <template #content>
      <div class="text-h6 text-error pa-3">Are you sure want to delete {{ category.name }}</div>
      <v-row>
        <v-col>
          <v-btn color="error" block @click="destroyData(category.id)">Yes</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" block @click="dialogDelete = false">No</v-btn>
        </v-col>
      </v-row>
    </template>
  </DialogComponents>

  <!-- Table -->
  <v-table hover>
    <thead>
      <tr>
        <th class="text-left">Number</th>
        <th class="text-left">Name</th>
        <th class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in paginatedCategories" :key="item.name">
        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          <v-btn size="x-small" color="info" icon="mdi-information" @click="getData(item)" />
          <v-btn
            size="x-small"
            color="primary"
            icon="mdi-pencil"
            class="mx-3"
            @click="editData(item)"
          />
          <v-btn size="x-small" color="error" icon="mdi-trash-can" @click="deleteData(item)" />
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @update:modelValue="changePage"
    class="custom-pagination mt-4"
  ></v-pagination>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import DialogComponents from '../components/dashboard/DialogComponents.vue'
import { useCategoryStore } from '../stores/CategoryStore'
import { onMounted, computed, ref } from 'vue'

// Storage
const CategoryStorage = useCategoryStore()

// State
const { category, form, dialog, dialogDetail, dialogDelete, categories } =
  storeToRefs(CategoryStorage)

// Action
const { onSubmitData, readCategory, getData, addData, editData, deleteData, destroyData } =
  CategoryStorage

// Pagination
const itemsPerPage = 10
const currentPage = ref(1)

// Filter Data
const sortOrder = ref('asc')

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const sortedCategories = computed(() => {
  if (!categories.value) return []
  return [...categories.value].sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })
})

const totalPages = computed(() => {
  return sortedCategories.value.length > 0
    ? Math.ceil(sortedCategories.value.length / itemsPerPage)
    : 0
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedCategories.value.slice(start, end)
})

const changePage = (page) => {
  currentPage.value = page
}

// Validation Form
const nameRules = [
  (value) => {
    if (value) return true
    return 'Name required'
  }
]

const descriptionRules = [
  (value) => {
    if (value) return true
    return 'Description required'
  }
]

onMounted(() => {
  readCategory()
})
</script>

<style scoped>
.custom-pagination {
  --v-theme-overlay-multiplier: 0;
}

:deep(.v-pagination__item) {
  color: blue !important;
}

:deep(.v-pagination__item--active) {
  background-color: lightblue !important;
  color: white !important;
}
</style>
