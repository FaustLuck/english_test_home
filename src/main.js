import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",
  authDomain: "english-test-home.firebaseapp.com",
  projectId: "english-test-home",
  storageBucket: "english-test-zhome.appspot.com",
  messagingSenderId: "223596466893",
  appId: "1:223596466893:web:bafc299ab7409de7cccf84"
};

let firebaseAuth = null;
let firebaseRealtime = null;

async function loadFirebaseAuth() {
  if (!firebaseAuth) {
    const {initializeApp} = await import("firebase/app");
    const {getAuth} = await import("firebase/auth");
    const app = initializeApp(firebaseConfig);

    firebaseAuth = getAuth(app);
  }
  /* webpackChunkName: 'firebaseAuth' */
  return firebaseAuth;
}

async function loadFirebaseRealtime() {
  if (!firebaseRealtime) {
    const {initializeApp} = await import("firebase/app");
    const {getDatabase} = await import("firebase/database");
    const app = initializeApp(firebaseConfig);
    firebaseRealtime = getDatabase(app);
  }
  return firebaseRealtime;
}

export { loadFirebaseAuth, loadFirebaseRealtime };


createApp(App).use(store).use(router).mount("#app");

//todo адаптивность
//todo семантика?
//todo бомба при fail
//todo черный экран "test over"
//todo вирт. питомец
//todo Настройки