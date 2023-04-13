import { mount } from "@vue/test-utils";
import vuetify from "../src/plugins/vuetify";
// @ts-ignore
import { createTestingPinia } from "@pinia/testing";
import { StateTree } from "pinia";


export function mountWrapper({ component, props = {}, slots = {} }: any, initialState: StateTree = {}) {
  return mount(component, {
    props,
    slots,
    global: {
      plugins: [
        vuetify,
        createTestingPinia({
          initialState
        })
      ]
    }
  });
}