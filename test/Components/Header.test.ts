import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe } from "vitest";
import Header from "@/stories/Header.vue";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives
});
describe.skip("Header", () => {
  let wrapper: VueWrapper;


  beforeEach(() => {

    wrapper = mount({
        render: () => `<VApp><Header/></VApp>`,
        components: { Header }
      },
      {
        global: {
          plugins: [vuetify],
        },
      })
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка кнопки Google, если пользователь не авторизован", () => {
    console.log(wrapper);

  });
});


// vi.mock("vue-router", async () => {
//   // const actual = await vi.importActual("vue-router");
//   return {
//     useRouter: () => vi.fn()
//   };
// });