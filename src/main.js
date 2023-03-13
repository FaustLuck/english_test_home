import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");

//todo семантика?
//todo вирт. питомец (опыт)
//todo настройки для детей
//todo загрузка из excel + буфера обмена?
