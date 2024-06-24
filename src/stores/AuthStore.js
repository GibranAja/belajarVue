import { auth, db } from '../config/firebase.js'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const formInput = ref(false)
  const router = useRouter()

  const currentUser = ref(null)
  const userCollection = collection(db, 'users')

  const user = reactive({
    name: '',
    email: '',
    password: ''
  })

  const isError = ref(false)
  const message = ref(null)

  const userHandler = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const queryId = query(userCollection, where('uid', '==', user.uid))
        const queryData = await getDocs(queryId)

        if (!queryData.empty) {
          const queryUser = queryData.docs[0].data()
          currentUser.value = {
            email: user.email,
            id: user.uid,
            name: queryUser.name,
            isAdmin: queryUser.isAdmin
          }
        } else {
          console.error('User document not found in Firestore')
          currentUser.value = null
        }
      } else {
        currentUser.value = null
      }
    })
  }

  const logOutUser = async () => {
    try {
      await signOut(auth)
      router.push({ name: 'HomePublic' })
    } catch (error) {
      console.error('Logout error:', error)
      isError.value = true
      message.value = 'Failed to log out. Please try again.'
    }
  }

  const authUser = async (isLogin = false) => {
    try {
      isError.value = false
      message.value = null
  
      if (isLogin) {
        await signInWithEmailAndPassword(auth, user.email, user.password)
      } else {
        const { user: createdUser } = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        )
        await addDoc(userCollection, {
          name: user.name,
          isAdmin: false,
          uid: createdUser.uid
        })
      }
  
      user.name = ''
      user.email = ''
      user.password = ''
  
      router.push({ name: 'Home' })
    } catch (error) {
      isError.value = true
      
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message.value = 'Login Failed : Email or Password wrong'
          break
        case 'auth/invalid-email':
          message.value = 'Email not valid.'
          break
        case 'auth/email-already-in-use':
          message.value = 'Register failed: Email Registered'
          break
        case 'auth/weak-password':
          message.value = 'Register Failed: Minimal Password 8 Characters'
          break
        default:
          message.value = `${isLogin ? 'Login' : 'Register'} Failed: ${error.message}`
      }
      
      console.error('Authentication error:', error)
    }
  }

  return {
    formInput,
    user,
    authUser,
    userHandler,
    currentUser,
    logOutUser,
    isError,
    message
  }
})