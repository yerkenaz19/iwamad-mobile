import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDf3upglbqVIYZlKMlMuUS9K-2Pk1unhKY',
  authDomain: 'iwamad-chat-1b622.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-1b622-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-1b622',
  storageBucket: 'iwamad-chat-1b622.firebasestorage.app',
  messagingSenderId: '295733510896',
  appId: '1:295733510896:web:91d69057ccef217801f835',
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)