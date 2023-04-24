import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../mountWithVuetify";
import { h } from "vue";
import Header from "@/components/Header.vue";
import HelperWrapper from "../HelperWrapper.vue";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";
import { useCommonStore } from "@/store/common";
import { useTestStore } from "@/store/test";

const component = HelperWrapper;

const initialState = {
  common: {
    mode: "result"
  }
};

function wrap() {
  return mountWrapper({
    component, slots: {
      default: h(Header),
    },
  }, initialState);
}

const mockedUseRouter = {
  replace: vi.fn(),
  push: vi.fn()
};
vi.mock("vue-router", async () => {
  return {
    useRouter: () => mockedUseRouter
  };
});

vi.mock("useTestStore", () => ({
  getTest: () => vi.fn(),
  sendAnswers: () => vi.fn()
}));

vi.mock("useAuthStore", () => ({
  loadScript: () => vi.fn()
}));

describe("Header", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = wrap();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка кнопки Google, если пользователь не авторизован", () => {
    expect(wrapper.find("button").attributes().id).toBe("google");
    expect(useAuthStore().loadScript).toHaveBeenCalled();
  });

  test("Отрисовка значка меню, если пользователь авторизован", async () => {
    useAuthStore().isLogin = true;
    expect(wrapper.find(".mdi-menu")).toBeDefined();
  });

  test("Клик по кнопке отправляет запрос на тест", async () => {
    expect(wrapper.text()).toContain("Начать тест");
    expect(wrapper.text()).not.toContain("Завершить тест");
    expect(useLoadingStore().isLoading).toBe(false);
    expect(wrapper.findAll(".v-progress-circular")).toHaveLength(0);
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(useTestStore().getTest).toHaveBeenCalledWith("");
    expect(useLoadingStore().isLoading).toBe(true);
    expect(wrapper.findAll(".v-progress-circular")).toHaveLength(1);
  });

  test("Если пользователь авторизован, запрашивает тест по sub", async () => {
    useAuthStore().$patch({ sub: "sub_user" });
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(useTestStore().getTest).toHaveBeenCalledWith("sub_user");
  });

  test("Если маршрут отличен от result и test, пушит новый путь", async () => {
    useCommonStore().mode = "somePath";
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(mockedUseRouter.replace).not.toHaveBeenCalledTimes(0);
    expect(mockedUseRouter.push).toHaveBeenCalledWith({ name: "test" });
  });

  test("Если маршрут result, делает замену пути", async () => {
    useCommonStore().mode = "result";
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(mockedUseRouter.replace).toHaveBeenCalledWith({ name: "test" });
    expect(mockedUseRouter.push).not.toHaveBeenCalledTimes(0);
  });
});