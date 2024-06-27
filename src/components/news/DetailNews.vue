<template>
  <v-card class="mx-auto">
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
    </v-img>

    <v-card-title class="font-weight-bold">{{ data.title }}</v-card-title>
    <v-card-subtitle class="pt-4 font-weight-normal"> {{ data.category.name }} </v-card-subtitle>

    <v-card-text>
      <div>{{ data.content }}</div>
      <div class="text-primary mt-5">Written By: {{ data.writtenBy.name }}</div>
      <div class="mt-1 text-medium-emphasis">Date Created: {{ new Date(data.createdAt).toDateString() }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="secondary" @click="$router.go(-1)">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
