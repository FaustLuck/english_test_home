import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import LoaderSpinner from '@/components/LoaderSpinner.vue'

import { initializeApp } from "firebase/app"
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",
  authDomain: "english-test-home.firebaseapp.com",
  projectId: "english-test-home",
  storageBucket: "english-test-home.appspot.com",
  messagingSenderId: "223596466893",
  appId: "1:223596466893:web:bafc299ab7409de7cccf84"
};
const firebaseApp = initializeApp(firebaseConfig);
export const firebase = {
  realtime: getDatabase(firebaseApp),
  auth: getAuth(firebaseApp)
}


createApp(App)
  .use(store)
  .use(router)
  .component('LoaderSpinner', LoaderSpinner)
  .mount('#app')