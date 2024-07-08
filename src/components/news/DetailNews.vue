<template>
  <v-card-actions class="mt-7">
    <v-btn color="secondary" @click="$router.go(-1)" prepend-icon="mdi-arrow-left" size="x-large">
      <p class="mx-3">Back</p>
    </v-btn>
  </v-card-actions>
  <v-card class="mx-auto">
    <v-img
      class="align-end text-white"
      style="width: 100%; height: auto"
      :src="data.image ? data.image : `https://cdn.vuetifyjs.com/images/cards/docks.jpg`"
      :aspect-ratio="4 / 3"
      contain
    >
    </v-img>

    <v-card-title class="font-weight-bold text-h5 full-title">{{ data.title }}</v-card-title>
    <v-card-subtitle class="pt-4 font-weight-normal text-h6">
      {{ data.category.name }}
    </v-card-subtitle>

    <v-card-text class="d-md-none">
      <div class="text-primary">Written By: {{ data.writtenBy.name }}</div>
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-1 full-content" v-html="formattedContent"></div>
      <div class="text-primary mt-5 d-none d-md-block">Written By: {{ data.writtenBy.name }}</div>
      <div class="mt-1 text-medium-emphasis">
        Date Created: {{ new Date(data.createdAt).toDateString() }}
      </div>
    </v-card-text>

    <v-card-text v-if="isAdmin">
      <div>
        <p style="color: red">{{ fileError }}</p>
      </div>
      <v-form style="width: 300px" @submit.prevent="handlingUploadFile(data)">
        <v-file-input
          label="Input Image"
          variant="filled"
          prepend-icon="mdi-camera"
          @change="handlingChange"
        ></v-file-input>
        <v-btn
          type="submit"
          :disabled="fileError || !formInput"
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
import { defineProps, ref, computed } from 'vue'
import { db, projectStorage } from '../../config/firebase.js'
import { ref as refFile, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isUpdate: {
    type: Boolean,
    default: true
  }
})

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.currentUser?.isAdmin)

const file = ref(null)
const fileError = ref(null)
const filePath = ref(null)
const urlFile = ref(null)
const formInput = ref(false)

// Router
const route = useRoute()
const router = useRouter()

// Validation
const types = ['image/png', 'image/jpg', 'image/jpeg']

const handlingChange = (e) => {
  const selected = e.target.files[0]

  if (selected && types.includes(selected.type)) {
    file.value = selected
    formInput.value = true
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'File must be PNG, JPG, and JPEG'
  }
}

const handlingUploadFile = async (data) => {
  if (!isAdmin.value) {
    console.error('Unauthorized access')
    return
  }

  if (file.value) {
    filePath.value = `thumbnail/${data.writtenBy.id}/${file.value.name}`
    const storageRef = refFile(projectStorage, filePath.value)
    const uploadTask = await uploadBytesResumable(storageRef, file.value)

    const getLink = await getDownloadURL(uploadTask.ref)
    urlFile.value = getLink

    try {
      await updateDoc(doc(db, 'news', route.params.id), {
        image: urlFile.value
      })

      router.push({ name: 'News' })
    } catch (error) {
      console.log(error)
    }
  }
}

const formattedContent = computed(() => {
  return props.data.content.replace(/\n/g, '<br>')
})
</script>

<style scoped>
.full-title,
.full-content {
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

.full-content {
  line-height: 1.6;
}

@media (max-width: 600px) {
  .full-title {
    font-size: 18px !important;
    line-height: 1.4 !important;
  }

  .full-content {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
}
</style>
