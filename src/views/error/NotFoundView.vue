<template>
    <div class="d-flex justify-center">
        <div>
            <img :src="NotFound" style="width: 40vw;" alt="">
            <h1>Nyari apa sih sayang</h1>
            <v-btn color="green" class="my-10" block :to="{name: 'Home'}">Back</v-btn>
        </div>
    </div>
</template>

<script setup>
import NotFound from '../../assets/NotFound.svg'
</script>