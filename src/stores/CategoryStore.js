import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

export const useCategoryStore = defineStore('Category', () => {
  const CategoryCollection = collection(db, 'categories')

  const dialog = ref(false)
  const form = ref(false)
  const category = reactive({
    name: '',
    description: ''
  })

  const categories = ref(null)

  const onSubmitData = async () => {
    if (!form.value) return
    await addDoc(CategoryCollection, {
      name: category.name,
      description: category.description
    })
    alert('Success')
    dialog.value = false

    readCategory()
  }

  const readCategory = async () => {
    const res = await getDocs(CategoryCollection)
    categories.value = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
  }

  return { dialog, form, category, onSubmitData, readCategory, categories }
})
