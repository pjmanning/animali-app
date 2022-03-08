import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCc4mj6ZFm58kvFIbiUszAI5fAsDAMHBeE',
  authDomain: 'animali-life.firebaseapp.com',
  databaseURL: 'https://animali-life.firebaseio.com',
  projectId: 'animali-life',
  storageBucket: 'animali-life.appspot.com',
  messagingSenderId: '112167594202',
  appId: '1:112167594202:web:f5cf3f319ce1beb4ca5de3',
  measurementId: 'G-YGPEPDGQY1',
}

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

export { db }
