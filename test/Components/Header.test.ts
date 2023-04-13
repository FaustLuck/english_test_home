import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../mountWithVuetify";
import { h, nextTick } from "vue";
import Header from "@/stories/Header.vue";
import HelperWrapper from "../HelperWrapper.vue";
import { useAuthStore } from "../../src/store/auth";
import { beforeEach, expect } from "vitest";

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
    await nextTick();

    const icons = wrapper.findAll(".v-icon");
    expect(wrapper.findAll(".v-icon").length).toBe(1);
    expect(icons[0].html().search("mdi-menu") > -1).toBe(true);
  });

  test("Смена надписи на кнопке", async () => {
    expect(wrapper.text().search("Начать тест") > -1).toBe(true);
    expect(wrapper.text().search("Завершить тест") > -1).toBe(false);
    await wrapper.find("button:not([id='google'])").trigger("click");
    await nextTick();
    expect(wrapper.text().search("Начать тест") > -1).toBe(false);
    expect(wrapper.text().search("Завершить тест") > -1).toBe(true);
  });

  //todo mock роутера написан верно
  //проверить его на смену путей


  //todo проблема с функцией startTest()
  //await useTestStore().getTest(sub); не вызывается!

});