import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../config/firebase'
import { useAuthStore } from './AuthStore'
import { useRouter } from 'vue-router'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export const useNewsStore = defineStore('News', () => {
  // State
  const news = reactive({
    id: '',
    title: '',
    content: '',
    category: '',
    isUpdate: false
  })

  const formInput = ref(false)

  const newsData = ref(null)

  const detailNews = ref(null)

  //  Router
  const router = useRouter()

  // Storage
  const authStore = useAuthStore()

  // Collection
  const newsCollection = collection(db, 'news')

  const handleSubmit = async () => {
    if (news.isUpdate) {
      // Update Data
      await updateDoc(doc(newsCollection, news.id), {
        title: news.title,
        content: news.content,
        category: {
          id: news.category.id,
          name: news.category.name
        }
      })
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

  const allNews = async () => {
    const fetchedNews = await getDocs(newsCollection)
    newsData.value = fetchedNews.docs
      .map((docs) => {
        return { ...docs.data(), id: docs.id }
      })
      .sort((a, b) => b.createdAt - a.createdAt)
  }

  const detailHandling = async (idParams) => {
    const docRef = doc(newsCollection, idParams)
    const docDetail = await getDoc(docRef)

    detailNews.value = docDetail.data()
  }

  const clearHandling = () => {
    ;(news.id = ''),
      (news.title = ''),
      (news.content = ''),
      (news.category = ''),
      (news.isUpdate = false)
  }

  const updateHandling = async (idParams) => {
    const docRef = doc(newsCollection, idParams)
    const docDetail = await getDoc(docRef)
    ;(news.id = docRef.id), (news.title = docDetail.data().title)
    news.content = docDetail.data().content
    news.category = docDetail.data().category
    news.isUpdate = true
  }

  const deleteHandling = async (idParams) => {
    await deleteDoc(doc(newsCollection, idParams))
    alert('Delete News Success')
    allNews()
  }

  return {
    news,
    formInput,
    handleSubmit,
    newsData,
    allNews,
    detailNews,
    detailHandling,
    clearHandling,
    updateHandling,
    deleteHandling
  }
})
