import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const userStorage = defineStore('User', () => {
  const userData = ref([
    {
      name: 'Iban',
      email: 'iban@gmail.com'
    },
    {
      name: 'Hehe',
      email: 'hehe@gmail.com'
    }
  ])

  const userInput = reactive({
    name: '',
    email: ''
  })

  const clearInput = () => {
    ;(userInput.name = ''), (userInput.email = '')
  }

  const addUser = () => {
    userData.value.push({
      name: userInput.name,
      email: userInput.email
    })

    clearInput()
  }

  const totalUsers = computed(() => {
    return userData.value.length
  })

  return { userData, userInput, addUser, totalUsers }
})
