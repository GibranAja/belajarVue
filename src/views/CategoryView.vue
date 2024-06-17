<template>
  <h1>Ini Halaman Category</h1>
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" icon="mdi-plus" size="large" @click="dialog = true"></v-btn>
  </div>

  <DialogComponents v-model="dialog">
    <template #title> Add Category </template>
    <template #content>
      <v-form v-model="form" @submit.prevent="onSubmitData">
        <v-text-field class="mb-1" :rules="nameRules" v-model="category.name" label="Name"></v-text-field>
        <v-textarea class="mb-1" :rules="descriptionRules" v-model="category.description" label="Description"></v-textarea>
        <v-btn block :disabled="!form" color="success" size="large" type="submit" variant="elevated">Add</v-btn>
      </v-form>
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
      <tr v-for="(item, index) in categories" :key="item.name">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          <v-btn size="x-small" color="info" icon="mdi-information" />
          <v-btn size="x-small" color="primary" icon="mdi-pencil" class="mx-3" />
          <v-btn size="x-small" color="error" icon="mdi-trash-can" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import DialogComponents from '../components/dashboard/DialogComponents.vue'
import { useCategoryStore } from '../stores/CategoryStore'
import { onMounted } from 'vue';

// Storage
const CategoryStorage = useCategoryStore()

// State
const { category, form, dialog, categories } = storeToRefs(CategoryStorage)

// Action
const { onSubmitData, readCategory } = CategoryStorage

onMounted(() => {
  readCategory()
})

// Validation Form
const nameRules = [
  (value) => {
    if(value) return true
    return 'Name required'
  }
]

const descriptionRules = [
  (value) => {
    if(value) return true
    return 'Description required'
  }
]
</script>
