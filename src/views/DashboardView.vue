<template>
  <h1>Halaman DashBoard</h1>
  <h4>Jumlah User = {{ usersData.totalUsers }}</h4>
  <div v-for='user in usersData.userData' :key='user.name'>
    <p>Name : {{ user.name }}</p>
    <p>email : {{ user.email }}</p>

    <hr>
  </div>
  <hr>
  <form @submit.prevent="submitData">
    <label>Nama</label> <br>
      <input type="text" v-model="usersData.userInput.name"><br><br>
      <!-- {{ usersData.userInput.name }} -->
    <label>Email</label> <br>
      <input type="text" v-model="usersData.userInput.email"><br><br>
      <!-- {{ usersData.userInput.email }} -->
    
    
    <input type="submit" value="Tambah">
  </form>
</template>

<script setup>
import {userStorage} from '../stores/UserStroage.js'

// Storage
const usersData = userStorage()
const submitData = () => {
  usersData.addUser()
}
</script>

<style scoped>
  input {
    border: 1px solid black;
  }
</style>