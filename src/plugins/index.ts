import vuetify from "./vuetify";
import pinia from "./pinia";
import router from "@/router";

export function registerPlugins(app: any) {
  app.use(pinia);
  app.use(router);
  app.use(vuetify);
}