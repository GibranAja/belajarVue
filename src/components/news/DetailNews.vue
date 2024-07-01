<template>
  <v-card-actions>
    <v-btn color="secondary" @click="$router.go(-1)" prepend-icon="mdi-arrow-left" size="extra-large">
      <p class="mx-3">Back</p>
    </v-btn>
  </v-card-actions>
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
      <div class="mt-1 text-medium-emphasis">
        Date Created: {{ new Date(data.createdAt).toDateString() }}
      </div>
    </v-card-text>

    <v-card-text>
      <div>
        <p style="color: red">{{ fileError }}</p>
      </div>
      <v-form style="width: 300px">
        <v-file-input
          label="Input Image"
          variant="filled"
          prepend-icon="mdi-camera"
          @change="handlingChange"
        ></v-file-input>
        <v-btn
          type="submit"
          :disabled="fileError"
          block
          class="my-3"
          size="large"
          :color="fileError ? 'red' : 'blue'"
          variant="tonal"
          >Upload</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  },
  isUpdate: {
    type: Boolean,
    default: true
  }
})

const file = ref(null)
const fileError = ref(null)

// Validation
const types = ['image/png', 'image/jpg', 'image/jpeg']

const handlingChange = (e) => {
  const selected = e.target.files[0]

  if (selected && types.includes(selected.type)) {
    file.value = selected
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'File must be PNG, JPG, and JPEG'
  }
}
</script>
