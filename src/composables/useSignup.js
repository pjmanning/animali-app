import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const error = ref(false)
const isLoading = ref(false)

const signup = async (email, password) => {
  error.value = null
  isLoading.value = true

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }

    error.value = null
    isLoading.value = false
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isLoading.value = false
  }
}

const useSignup = () => {
  return {
    error,
    isLoading,
    signup,
  }
}

export default useSignup
