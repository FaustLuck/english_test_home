import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import CalendarHeader from "@/stories/calendar/CalendarHeader.vue";

const component = CalendarHeader;

describe("CalendarHeader", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Проверка отрисовки", () => {
    wrapper = mountWrapper({
      component, props: {
        year: 2022,
        min: 2021,
        max: 2023
      }
    });
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.find('.mdi-chevron-left')).toBeDefined()
    expect(wrapper.find('.mdi-chevron-right')).toBeDefined()
  });

  test("Кнопки влево/вправо заблокированы, если счетчик достиг минимального/максимального порога", () => {
    wrapper = mountWrapper({
      component, props: {
        year: 2022,
        min: 2022,
        max: 2022
      }
    });
    const buttons = wrapper.findAll(".v-btn");
    buttons.forEach(btn => {
      expect(btn.attributes().disabled).toBeDefined();
    });
  });

  test("Щелчок по кнопке отправляет событие", async () => {
    wrapper = mountWrapper({
      component, props: {
        year: 2022,
        min: 2021,
        max: 2023
      }
    });
    const buttons = wrapper.findAll(".v-btn");
    await buttons[0].trigger("click");
    expect(wrapper.emitted().decrement).toBeDefined();

    await buttons[1].trigger("click");
    expect(wrapper.emitted().increment).toBeDefined();
  });
});