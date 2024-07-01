<template>
  <RouterView />
</template>

<script setup>
import { onMounted, provide } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/AuthStore';
import { storeToRefs } from 'pinia';

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

provide('currentUser', currentUser)

onMounted (() => {
  auth.userHandler()
})
</script>

<style>
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: lightblue;
      border-radius: 30px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: blue;
    }
  </style>