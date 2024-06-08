<template>
    <v-app>
        <!-- Header -->
        <HeaderComponent />
        <!-- Main Content -->
         <v-container style="min-height: 100vh;" class="my-10">

             <RouterView />
         </v-container>

        <!-- Footer -->
         <FooterComponent />
    </v-app>
</template>

<script setup>
import FooterComponent from '../components/public/FooterComponent.vue';
import HeaderComponent from '../components/public/HeaderComponent.vue';
</script>