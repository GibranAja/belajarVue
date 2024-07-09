<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="text-center text-h3 text-primary my-6">
          {{ isLogin ? 'Login' : 'Register' }}
        </div>

        <v-card class="pa-6 pb-8" elevation="8" rounded="lg">
          <v-form v-model="formInput" @submit.prevent="isLogin ? authUser(true) : authUser()">
            <v-alert
              v-if="isError"
              type="error"
              title="Error"
              :text="message"
              variant="tonal"
              class="mb-6"
            ></v-alert>

            <div v-if="!isLogin" class="mb-6">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">Name</div>
              <v-text-field
                density="comfortable"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :rules="nameRules"
                v-model="user.name"
              ></v-text-field>
            </div>

            <div class="mb-6">
              <div class="text-subtitle-1 text-medium-emphasis mb-2">Email</div>
              <v-text-field
                density="comfortable"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :rules="emailRules"
                v-model="user.email"
              ></v-text-field>
            </div>

            <div class="mb-6">
              <div
                class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-2"
              >
                Password
              </div>
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="comfortable"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="[passwordRules.required, passwordRules.min]"
                v-model="user.password"
              ></v-text-field>
            </div>

            <v-btn
              :disabled="!formInput"
              class="mb-6"
              type="submit"
              color="blue"
              size="large"
              variant="tonal"
              block
              height="56"
            >
              {{ isLogin ? 'Login' : 'Register' }}
            </v-btn>
          </v-form>

          <v-card-text class="text-center mt-4" v-if="isLogin">
            <router-link
              class="text-blue text-decoration-none"
              :to="{ name: 'Register' }"
              rel="noopener noreferrer"
            >
              Don't have account? Sign Up Now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>

          <v-card-text class="text-center mt-4" v-else>
            <router-link
              class="text-blue text-decoration-none"
              :to="{ name: 'Login' }"
              rel="noopener noreferrer"
            >
              Login Now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/AuthStore.js'
import { storeToRefs } from 'pinia'

// Store
const authStore = useAuthStore()

// State
const { formInput, user, isError, message } = storeToRefs(authStore)

// Action
const { authUser } = authStore

// Validation
const nameRules = [
  (value) => {
    if (value) return true
    return 'Name Required'
  }
]

const emailRules = [
  (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
]

const passwordRules = {
  required: (value) => !!value || 'Password Required',
  min: (value) => value.length >= 8 || 'Minimal password 8 characters'
}

const visible = ref(false)

defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
})
</script>
