<template>
    <h1>Detail News</h1>
    <div v-if="detailNews">
      <DetailNewsComponent :data="detailNews" />
    </div>
    
    <Transition name="fade-slide">
      <v-btn
        v-show="showBackToTop"
        @click="scrollToTop"
        icon="mdi-arrow-up"
        color="primary"
        fab
        class="back-to-top-btn"
        size="large"
      >
      </v-btn>
    </Transition>
  </template>
  
  <script setup>
  import { onMounted, ref, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useNewsStore } from '../../../stores/NewsStore.js'
  import { storeToRefs } from 'pinia'
  import DetailNewsComponent from '../../../components/news/DetailNews.vue'
  
  // Store and Route
  const newsStore = useNewsStore()
  const route = useRoute()
  
  // State
  const { detailNews } = storeToRefs(newsStore)
  const showBackToTop = ref(false)
  let lastScrollPosition = 0
  
  // Action
  const { detailHandling } = newsStore
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  const checkScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
      // Scrolling down and past 100px
      showBackToTop.value = true
    } else if (currentScrollPosition < lastScrollPosition || currentScrollPosition <= 100) {
      // Scrolling up or at the top
      showBackToTop.value = false
    }
    
    lastScrollPosition = currentScrollPosition
  }
  
  onMounted(() => {
    detailHandling(route.params.id).then(() => {
      window.scrollTo(0, 0)
    })
    
    window.addEventListener('scroll', checkScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
  })
  </script>
  
  <style scoped>
  .back-to-top-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 99;
    transition: transform 0.3s ease;
  }
  
  .back-to-top-btn:hover {
    transform: scale(1.1);
  }
  
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
  
  .back-to-top-btn {
    animation: pulse 2s infinite;
  }
  </style>