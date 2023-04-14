import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../mountWithVuetify";
import { h, nextTick } from "vue";
import Header from "@/stories/Header.vue";
import HelperWrapper from "../HelperWrapper.vue";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";
import { useCommonStore } from "../../src/store/common";
import { fetchHelperGet } from "../fetchHelpers";

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

vi.mock("vue", async () => {
  const actual: any = await vi.importActual("vue");
  return {
    ...actual,
    onMounted: () => vi.fn()
  };
});

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
  });

  test("Отрисовка значка меню, если пользователь авторизован", async () => {
    useAuthStore().isLogin = true;
    const icons = wrapper.findAll(".v-icon");
    expect(wrapper.findAll(".v-icon")).toHaveLength(1);
    expect(icons[0].html().search("mdi-menu") > -1).toBe(true);
  });

  test("Клик по кнопке отправляет запрос на тест", async () => {
    global.fetch = fetchHelperGet();
    expect(wrapper.text().search("Начать тест") > -1).toBe(true);
    expect(wrapper.text().search("Завершить тест") > -1).toBe(false);
    expect(useLoadingStore().isLoading).toBe(false);
    expect(wrapper.findAll(".v-progress-circular")).toHaveLength(0);
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(global.fetch).toBeCalledWith(`${import.meta.env.VITE_dev}/test/`);
    expect(useLoadingStore().isLoading).toBe(true);
    expect(wrapper.findAll(".v-progress-circular")).toHaveLength(1);
  });

  test("Если маршрут отличен от result и test, пушит новый путь", async () => {
    useCommonStore().mode = "somePath";
    global.fetch = fetchHelperGet();
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(mockedUseRouter.replace).not.toHaveBeenCalledTimes(0);
    expect(mockedUseRouter.push).toHaveBeenCalledWith({ name: "test" });
  });

  test("Если маршрут result, делает замену пути", async () => {
    useCommonStore().mode = "result";
    global.fetch = fetchHelperGet();
    await wrapper.find("button:not([id='google'])").trigger("click");
    expect(mockedUseRouter.replace).toHaveBeenCalledWith({ name: "test" });
    expect(mockedUseRouter.push).not.toHaveBeenCalledTimes(0);
  });

  test("Клик по бургер-меню вызывает toggleNavigation", async () => {
    useAuthStore().isLogin = true;
    const menuButton = wrapper.find(".v-app-bar-nav-icon");
    await menuButton.trigger("click");
    expect(wrapper.emitted('click')).toHaveLength(1)
  });
});