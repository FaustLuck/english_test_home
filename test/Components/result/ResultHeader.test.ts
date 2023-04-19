import ResultHeader from "@/stories/result/ResultHeader.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";

const component = ResultHeader;

const props = {
  timestamp: 1681402917884,
  correct: 5,
  timeSpent: 200,
  length: 10
};
describe("ResultHeader", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Проверка отрисовка даты и времени тестирования", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text()).toContain("13.04.2023 19:21");
    expect(wrapper.text()).toContain("3:20");
    expect(wrapper.text()).toContain("5 / 10");
  });

  test("Отрисовка во время процесса загрузки", () => {
    wrapper = mountWrapper({ component });
    expect(wrapper.text()).toContain("Loading");
  });
});