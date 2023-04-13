import { mount } from "@vue/test-utils";
import vuetify from "../src/plugins/vuetify";
// @ts-ignore
import { createTestingPinia } from "@pinia/testing";


export function mountWrapper({ component, props = {} }: any, initialState: any = {}) {
  return mount(component, {
    props,
    global: {
      plugins: [
        vuetify,
        createTestingPinia({
          stubActions:false,
          initialState
        })
      ]
    }
  });
}