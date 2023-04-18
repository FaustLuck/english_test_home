import Month from "@/stories/calendar/Month.vue";
import { mountWrapper } from "../../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { useHistoryStore } from "@/store/history";
import { expect } from "vitest";

const component = Month;

const props = {
  monthIndex: 2,
  year: 2023,
  sub: "sub",
  loading: true
};

const history = {
  "sub": {
    2023: [
      { "key": "key_1", "timestamp": 1679230140000 },
      { "key": "key_1", "timestamp": 1679039940000 }
    ]
  }
};

describe("Month", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка при загрузке", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text().search("Loading") > -1).toBe(true);
  });

  test("Отрисовка шапки", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text().search("апрель") > -1).toBe(true);
    expect(wrapper.text().search("Вт") > -1).toBe(true);
  });

  test("Отрисовка когда загрузка завершена", async () => {
    wrapper = mountWrapper({ component, props }, { history: { history } });
    await wrapper.setProps({ loading: false });
    expect(wrapper.text().search("Loading") > -1).toBe(false);
    expect(wrapper.text().search(/\d/) > -1).toBe(true);
    const buttons = wrapper.find("tbody").findAll(".v-btn");

    expect(buttons).toHaveLength(31);
    expect(buttons[17].attributes('disabled')).toBeDefined();
    expect(buttons[18].attributes('disabled')).not.toBeDefined()
  });

  test.todo("Клик по дате запрашивает тесты",async ()=>{
    wrapper = mountWrapper({ component, props }, { history: { history } });
    await wrapper.setProps({ loading: false });
    const buttons = wrapper.find("tbody").findAll(".v-btn");
    await buttons[18].trigger("click");
    console.log(wrapper.emitted());
  })


});