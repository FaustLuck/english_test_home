import { mountWrapper } from "./mountWithVuetify";
import HelperWrapper from "./HelperWrapper.vue";
import { h } from "vue";
import { StateTree } from "pinia";

const component = HelperWrapper;

export function mountWithLayout(innerComponent: any, initialState: StateTree={}) {
  return mountWrapper({
    component, slots: {
      default: h(innerComponent),
    },
  }, initialState);
}