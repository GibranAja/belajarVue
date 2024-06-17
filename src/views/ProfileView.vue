<template>
    <div>
        <h1>Ini Halaman Profile</h1>
        <h4>Jumlah User = {{ usersData.totalUsers }}</h4>
        <div v-for = "user in usersData.userData" :key="user.name">
            <p>Nama : {{ user.name }}</p>
            <p>Email : {{ user.email }}</p>
        </div>
    </div>
    <v-divider></v-divider>
    <IconLink color="red" icon="mdi-youtube" link="https://www.youtube.com" />
    <IconLink color="black" icon="mdi-github" link="https://github.com/GibranAja/belajarVue" />
    <IconLink color="pink" icon="mdi-instagram" link="https://www.instagram.com/p/C7l72iBBuI4/" />
</template>

<script setup>
import IconLink from '../components/IconLink.vue'
import { userStorage } from '../stores/UserStroage.js'

// Storgage
const usersData = userStorage()
</script>