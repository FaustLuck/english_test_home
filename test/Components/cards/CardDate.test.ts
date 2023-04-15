import CardDate from "@/stories/cards/CardDate.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { afterEach, describe, expect } from "vitest";
import { useHistoryStore } from "../../../src/store/history";

const component = CardDate;

const props = {
  datestamp: 1679173200000,
  counter: 4,
  sub: "sub"
};

const initialState = {
  history: {
    dateList: {
      sub: {
        1679173200000: {
          counter: 4
        }
      }
    }
  }
};


describe("CardDate", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка, если данные не переданы", () => {
    wrapper = mountWrapper({ component });
    expect(wrapper.text().search("Loading") > -1).toBe(true);
  });

  test("Отрисовка, если есть данные", () => {
    wrapper = mountWrapper({ component, props });
    expect(wrapper.text().search("19.03.2023") > -1).toBe(true);
    expect(wrapper.text().search(`Количество тестов: ${props.counter}`) > -1).toBe(true);
  });

  test("Отправка запроса по клику", async () => {
    wrapper = mountWrapper({ component, props }, initialState, true);
    await wrapper.trigger("click");
    expect(useHistoryStore().getTimeList).toBeCalledWith("sub", props.datestamp);
  });

  test("Запрос не будет отправлен, если данные уже есть", async () => {
    wrapper = mountWrapper({ component, props }, initialState, true);
    Object.assign(useHistoryStore().dateList['sub'][1679173200000],{12:"sd"},{13:'s2'})
    await wrapper.trigger("click");
    expect(useHistoryStore().getTimeList).not.toBeCalled();
  });
});