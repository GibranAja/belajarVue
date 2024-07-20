<template>
  <div>
    <h1>Ini Halaman Profile</h1>
    <div>
      <p>Nama : {{ currentUser.name }}</p>
      <p>Email : {{ currentUser.email }}</p>
    </div>
  </div>
  <v-divider></v-divider>
  <IconLink color="red" icon="mdi-youtube" link="https://www.youtube.com/watch?v=lLJGB2fcZxY" />
  <IconLink color="black" icon="mdi-github" link="https://github.com/GibranAja/belajarVue" />
  <IconLink color="pink" icon="mdi-instagram" link="https://www.instagram.com/p/C7l72iBBuI4/" />
</template>

<script setup>
import IconLink from '../components/IconLink.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

// Store
const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

</script>
