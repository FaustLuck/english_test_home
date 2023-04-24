import Day from "@/components/calendar/Day.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { useHistoryStore } from "@/store/history";

const component = Day;

const propsLoaded = {
  timestamp: "1679173200000",
  sub: "user_sub"
};

const propsMustLoading = {
  timestamp: "1647637200000",
  sub: "user_sub"
};

const history = {
  "user_sub": {
    2023: [
      { "key": "key_1", "timestamp": 1679230140000, info: {} },
      { "key": "key_1", "timestamp": 1679039940000, info: {} }
    ],
    2022: [
      { "key": "key_1", "timestamp": 1647694140000 },
      { "key": "key_1", "timestamp": 1647503940000 }
    ]
  }
};

vi.mock("useHistoryStore", () => ({
  getHistoryRange: () => vi.fn()
}));

describe("Day", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Если есть информация о тестах за день, запроса нет", () => {
    const props = propsLoaded;
    wrapper = mountWrapper({ component, props }, { history: { history } });
    expect(useHistoryStore().getHistoryRange).not.toHaveBeenCalled();
  });

  test("Если нет информации о тестах за день, отправляется запрос", () => {
    const props = propsMustLoading;
    wrapper = mountWrapper({ component, props }, { history: { history } });
    const year = new Date(+props.timestamp).getFullYear();
    const start = +props.timestamp;
    const end = +props.timestamp + 24 * 60 * 60 * 1000;
    expect(useHistoryStore().getHistoryRange).toHaveBeenCalledWith(year, props.sub, start, end);
  });
});