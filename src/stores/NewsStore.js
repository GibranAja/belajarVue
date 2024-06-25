import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../config/firebase'
import { useAuthStore } from './AuthStore'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'

export const useNewsStore = defineStore('News', () => {
  const news = reactive({
    id: '',
    title: '',
    content: '',
    category: '',
    isUpdate: false
  })

  const formInput = ref(false)

  //  Router
  const router = useRouter()

  // Storage
  const authStore = useAuthStore()

  // Collection
  const newsCollection = collection(db, 'news')

  const handleSubmit = async () => {
    if (news.isUpdate) {
      // Update Data
    } else {
      // Add Data
      const now = Date.now()
      await addDoc(newsCollection, {
        title: news.title,
        content: news.content,
        category: {
          id: news.category.id,
          name: news.category.name
        },
        isApprove: false,
        image: null,
        writtenBy: {
          id: authStore.currentUser.id,
          name: authStore.currentUser.name,
          email: authStore.currentUser.email
        },
        createdAt: now
      })
      alert('Succes adding news document')
    }
    router.push({ name: 'News' })
  }

  return {
    news,
    formInput,
    handleSubmit
  }
})