import { shallowMount } from "@vue/test-utils";
import vuetify from "../src/plugins/vuetify";
// @ts-ignore
import { createTestingPinia } from "@pinia/testing";


export function createWrapper({ component, props = {} }: any, initialState: any = {}) {
  return shallowMount(component, {
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