<template>
    <authFormComponent :isLogin="isLogin" />
</template>

<script setup>
import authFormComponent from '../../components/public/AuthFormComponent.vue'

const isLogin = true
</script>