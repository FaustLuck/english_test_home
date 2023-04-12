import { mount } from "@vue/test-utils";
import vuetify from "../src/plugins/vuetify";
// @ts-ignore
import { createTestingPinia } from "@pinia/testing";



export function createWrapper(component: any, initialState: any={}) {
  return mount(component, {
    global: {
      plugins: [
        vuetify,
        createTestingPinia({
          createSpy: vi.fn,
          initialState
        })
      ]
    }
  });
}