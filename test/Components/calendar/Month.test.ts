import Month from "@/stories/calendar/Month.vue";
import { mountWrapper } from "../../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
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

const mockedRouter = {
  push: vi.fn()
};
vi.mock("vue-router", () => ({
  useRouter: () => mockedRouter
}));

describe("Month", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка при загрузке", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text()).toContain("Loading");
  });

  test("Отрисовка шапки", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text()).toContain("март");
    expect(wrapper.text()).toContain("Вт");
  });

  test("Отрисовка когда загрузка завершена", async () => {
    wrapper = mountWrapper({ component, props }, { history: { history } });
    await wrapper.setProps({ loading: false });
    expect(wrapper.text()).not.toContain("Loading");
    expect(wrapper.text()).toContain(28);
    const buttons = wrapper.find("tbody").findAll(".v-btn");

    expect(buttons).toHaveLength(31);
    expect(buttons[17].attributes("disabled")).toBeDefined();
    expect(buttons[18].attributes("disabled")).not.toBeDefined();
  });

  test("Отрисовка, если в месяце не было тестов", async () => {
    wrapper = mountWrapper({ component, props }, { history: { history } });
    await wrapper.setProps({ loading: false, monthIndex: 1 });
    expect(wrapper.text()).toContain("В этом месяце тестов не было");
  });

  test("Клик по дате запрашивает тесты", async () => {
    wrapper = mountWrapper({ component, props }, { history: { history } });
    await wrapper.setProps({ loading: false });
    const buttons = wrapper.find("tbody").findAll(".v-btn");
    const index = 18;
    await buttons[index].trigger("click");
    const timestamp = new Date(props.year, props.monthIndex, index + 1).getTime();
    expect(mockedRouter.push).toHaveBeenCalledWith({ name: "day", params: { sub: props.sub, timestamp } });
  });
});