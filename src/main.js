import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import LoaderSpinner from '@/components/LoaderSpinner.vue'

import { initializeApp } from "firebase/app"
const firebaseConfig = {
  apiKey: "AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",
  authDomain: "english-test-home.firebaseapp.com",
  projectId: "english-test-home",
  storageBucket: "english-test-home.appspot.com",
  messagingSenderId: "223596466893",
  appId: "1:223596466893:web:bafc299ab7409de7cccf84"
};
const firebase = initializeApp(firebaseConfig);

export default firebase


//let app;

//firebase.auth.onAuthStateChanged(() => {
 // if (app) return
  createApp(App)
    .use(store)
    .use(router)
    .component('LoaderSpinner', LoaderSpinner)
    .mount('#app')
//})




//TODO - подумать на компонентом CardItem (src/components/CardItem.vue) (разбить на несколько)
//TODO - подумать над структурой хранения БД, чтобы CardItem получал 1 - Question и массив Answer
//TODO - страница тестирования
//TODO - тест-6 если все правильно - то салют
//TODO - тест-7 если нет, то компонент с результатами

