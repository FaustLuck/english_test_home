import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",
  authDomain: "english-test-home.firebaseapp.com",
  projectId: "english-test-home",
  storageBucket: "english-test-zhome.appspot.com",
  messagingSenderId: "223596466893",
  appId: "1:223596466893:web:bafc299ab7409de7cccf84"
};

let app = null;
export let firebaseAuth = null;
export let firebaseRealtime = null;

function initFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(app);
    firebaseRealtime = getDatabase(app);
  }
}

initFirebase();
createApp(App).use(store).use(router).mount("#app");

//todo cardTestItemComponent для settings
//todo cardTestItemComponent для test
//todo cardTestItemComponent для result/statistic
//todo title component? (position:sticky if isOpen etc.)

//todo семантика?
//todo вирт. питомец
//todo Настройки