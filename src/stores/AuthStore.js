import { auth, db } from '../config/firebase.js'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue' // Ditambahkan import untuk watch
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { addDoc, collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore' // Ditambahkan import untuk doc, setDoc, dan getDoc
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
// import DialogComponents from '@/components/dashboard/DialogComponents.vue'

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

  // Toast
  const toast = useToast()

  // Dialog
  const dialogLogout = ref(false)

  // Ditambahkan: sessionId untuk menangani concurrent login
  const sessionId = ref(null)

  // Ditambahkan: Fungsi untuk menghasilkan sessionId unik
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Ditambahkan: Fungsi untuk memeriksa concurrent login
  const checkConcurrentLogin = async (userId) => {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists() && userDoc.data().sessionId && userDoc.data().sessionId !== sessionId.value) {
      // Concurrent login detected
      toast.error('Kamu sudah login di perangkat lain, silakan logout terlebih dahulu', {
        timeout: 5000,
        position: "top-center",
      })
      await signOut(auth)
      currentUser.value = null
      router.push({ name: 'Login' })
      return false
    }
    return true
  }

  // Ditambahkan: Fungsi untuk memperbarui sessionId di Firestore
  const updateSessionId = async (userId) => {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, { sessionId: sessionId.value }, { merge: true })
  }

  const userHandler = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const queryId = query(userCollection, where('uid', '==', user.uid))
        const queryData = await getDocs(queryId)

        if (!queryData.empty) {
          const queryUser = queryData.docs[0].data()
          
          // Ditambahkan: Memeriksa concurrent login
          if (await checkConcurrentLogin(user.uid)) {
            currentUser.value = {
              email: user.email,
              id: user.uid,
              name: queryUser.name,
              isAdmin: queryUser.isAdmin
            }
            
            // Ditambahkan: Memperbarui sessionId jika belum ada
            if (!sessionId.value) {
              sessionId.value = generateSessionId()
              await updateSessionId(user.uid)
            }
          }
        } else {
          console.error('User document not found in Firestore')
          currentUser.value = null
        }
      } else {
        currentUser.value = null
        sessionId.value = null // Ditambahkan: Mengatur sessionId menjadi null saat logout
      }
    })
  }

  const confirmLogout = () => {
    dialogLogout.value = true
  }

  const logOutUser = async () => {
    try {
      const userId = auth.currentUser.uid // Ditambahkan: Menyimpan userId sebelum logout
      await signOut(auth)
      dialogLogout.value = false
      
      // Ditambahkan: Menghapus sessionId di Firestore
      const userRef = doc(db, 'users', userId)
      await setDoc(userRef, { sessionId: null }, { merge: true })
      
      sessionId.value = null // Ditambahkan: Mengatur sessionId lokal menjadi null
      
      router.push({ name: 'HomePublic' }).then(() => {
        toast.success(`Kamu berhasil logout!`, {
          timeout: 3000,
          position: "top-right",
          pauseOnHover: false
        })
      })
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

      const queryId = query(userCollection, where('uid', '==', auth.currentUser.uid))
      const queryData = await getDocs(queryId)

      if (!queryData.empty) {
        const queryUser = queryData.docs[0].data()
        
        // Ditambahkan: Memeriksa concurrent login
        if (await checkConcurrentLogin(auth.currentUser.uid)) {
          currentUser.value = {
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            name: queryUser.name,
            isAdmin: queryUser.isAdmin
          }
          
          // Ditambahkan: Menghasilkan dan memperbarui sessionId
          sessionId.value = generateSessionId()
          await updateSessionId(auth.currentUser.uid)

          // Toaster
          toast.success(`Hai, ${currentUser.value.name}!`, {
            timeout: 3000,
            position: "top-right",
          })

          // Route 
          if (queryUser.isAdmin) {
            router.push({ name: 'Home' })
          } else {
            router.push({ name: 'HomePublic' })
          }
        }
      } else {
        console.error('User document not found in Firestore')
        currentUser.value = null
        router.push({ name: 'HomePublic' })
      }

      user.name = ''
      user.email = ''
      user.password = ''

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

  // Ditambahkan: watch untuk memperbarui localStorage saat sessionId berubah
  watch(sessionId, (newSessionId) => {
    if (newSessionId) {
      localStorage.setItem('sessionId', newSessionId)
    } else {
      localStorage.removeItem('sessionId')
    }
  })

  return {
    formInput,
    user,
    authUser,
    userHandler,
    currentUser,
    logOutUser,
    isError,
    message,
    dialogLogout,
    confirmLogout,
    sessionId, // Ditambahkan: Mengekspos sessionId
    checkConcurrentLogin // Ditambahkan: Mengekspos fungsi checkConcurrentLogin
  }
})