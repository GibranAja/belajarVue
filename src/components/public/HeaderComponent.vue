<template>
  <v-toolbar app class="bg-blue-lighten-4">
    <RouterLink :to="{ name: 'LandingPage' }">
      <span class="ml-15">HNN</span>
    </RouterLink>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat v-for="item in menuItems" :key="item.title">
        <v-icon left>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
const menuItems = [
  {
    title: 'Category',
    icon: 'mdi-newspaper'
  },
  {
    title: 'Login',
    icon: 'mdi-login'
  },
  {
    title: 'Register',
    icon: 'mdi-account-plus'
  }
]
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>
