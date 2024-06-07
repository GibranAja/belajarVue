<template>
  <h1>Ini Halaman Category</h1>
  <v-list>
    <v-list-item :to="{ name : 'Category-name', params:{ name: 'Entertaintment' }}">
        Entertainment
      </v-list-item>
    <v-list-item :to="{ name : 'Category-name', params:{ name: 'Sport' }}">Sport</v-list-item>
    <v-list-item :to="{ name : 'Category-name', params:{ name: 'IT' }}">IT</v-list-item>
  </v-list>
</template>
