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
let app = null;
let firebaseAuth = null;
let firebaseRealtime = null;

async function initFirebase() {
  if (!app) {
    const {initializeApp} = await import(/* webpackChunkName: "initializeApp" */"firebase/app");
    app = initializeApp(firebaseConfig);
  }
  return app;
}

async function loadFirebaseAuth() {
  if (!firebaseAuth) {
    const {getAuth} = await import(/* webpackChunkName: "getAuth" */"firebase/auth");
    firebaseAuth = getAuth(app);
  }
  return firebaseAuth;
}

async function loadFirebaseRealtime() {
  if (!firebaseRealtime) {
    const {getDatabase} = await import(/* webpackChunkName: "getDatabase" */"firebase/database");
    firebaseRealtime = getDatabase(app);
  }
  return firebaseRealtime;
}

export { loadFirebaseAuth, loadFirebaseRealtime };

initFirebase()
  .then((firebase) => {
    app = firebase;
    createApp(App).use(store).use(router).mount("#app");
  })
  .catch(e => {
    console.log(e);
  });


//todo семантика?
//todo вирт. питомец
//todo Настройки