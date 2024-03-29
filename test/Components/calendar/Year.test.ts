import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import Year from "@/components/calendar/Year.vue";
import { useHistoryStore } from "@/store/history";

const component = Year;
const props = {
  sub: "sub_user",
  year: "2022"
};

const history = {
  "sub_user": {
    "2023": [{
      "key": "key_1",
      "timestamp": 1679230140000
    }, {
      "key": "key_2",
      "timestamp": 1679039940000
    }],
    "2022": []
  }
};
const users = [{
  "sub": "sub_user",
  "minYear": 2022
}];
const initialState = {
  history: {
    history,
    users
  }
};

const mock = vi.fn();
vi.mock("useHistoryStore", () => ({
  getHistoryRange: () => mock
}));

describe("Year", () => {

  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка, если за год не найдено записей", () => {
    wrapper = mountWrapper({ component, props }, initialState);
    expect(wrapper.text()).toContain(`За ${props.year} год записей не найдено`);
  });

  test("Если история за год не подгружена, то отправляется запрос", async () => {
    wrapper = mountWrapper({ component, props }, { history: { users } });
    const start = new Date(+props.year, 0).getTime();
    const end = new Date(+props.year + 1, 0).getTime() - 1;
    expect(useHistoryStore().getHistoryRange).toHaveBeenCalledWith(+props.year, props.sub, start, end);
  });
});