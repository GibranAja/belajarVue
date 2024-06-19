<template>
  <h1>Ini Halaman Category</h1>
  <div class="d-flex justify-end my-6">
    <v-btn color="primary" icon="mdi-plus" size="large" @click="addData()"></v-btn>
  </div>

  <DialogComponents v-model="dialog">
    <template #title> 
      <div>
        {{ category.isUpdate ? "Update Category" : "Add Category" }}
      </div>  
    </template>
    <template #content>
      <v-form v-model="form" @submit.prevent="onSubmitData">
        <v-text-field class="mb-1" :rules="nameRules" v-model="category.name" label="Name"></v-text-field>
        <v-textarea class="mb-1" :rules="descriptionRules" v-model="category.description" label="Description"></v-textarea>
        <v-btn block :disabled="!form" color="success" size="large" type="submit" variant="elevated">{{ category.description ? "Update" : "Add" }}</v-btn>
      </v-form>
    </template>
  </DialogComponents>

  <DialogComponents v-model="dialogDetail">
    <template #title>{{ category.name }}</template>
    <template #content>{{ category.description }}</template>
  </DialogComponents>

  <DialogComponents v-model="dialogDelete">
    <template #title>
      Delete Category
    </template>
    <template #content>
      <div class="text-h6 text-error pa-3">Are you sure want to delete {{ category.name }}</div>
      <v-row>
        <v-col>
          <v-btn color="primary" block @click="destroyData(category.id)">Yes</v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" block @click="dialogDelete = false">No</v-btn>
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
      <tr v-for="(item, index) in categories" :key="item.name">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          <v-btn size="x-small" color="info" icon="mdi-information" @click="getData(item)" />
          <v-btn size="x-small" color="primary" icon="mdi-pencil" class="mx-3" @click="editData(item)" />
          <v-btn size="x-small" color="error" icon="mdi-trash-can" @click="deleteData(item)" />
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
const { category, form, dialog, dialogDetail,dialogDelete, categories } = storeToRefs(CategoryStorage)

// Action
const { onSubmitData, readCategory, getData, addData, editData, deleteData, destroyData } = CategoryStorage

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