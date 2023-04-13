import CardUser from "@/stories/cards/CardUser.vue";
import { mountWrapper } from "../../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { expect } from "vitest";
import { User } from "@/types/history";

const component = CardUser;

const user: User = {
  key: "key",
  name: "userName",
  picture: "someLink",
  privileged: false,
  sub: "sub"
};

describe("CardUser", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка, если списка пользователей нет", () => {
    wrapper = mountWrapper({ component });
    expect(wrapper.text().search("Loading") > -1).toBe(true);
  });

  test("Отрисовка, если список пользователей доступен", () => {
    wrapper = mountWrapper({ component, props: { user } });
    expect(wrapper.text().search(user.name) > -1).toBe(true);
    expect(wrapper.find("img").attributes().src).toBe(user.picture);
    expect(wrapper.find(".v-card").attributes().privileged).toBeUndefined();
  });

  test("Применение класса к карточке привилегированного пользователя", async () => {
    wrapper = mountWrapper({ component, props: { user } });
    await wrapper.setProps({ privileged: true });
    expect(wrapper.find(".v-card").attributes().privileged).toBeDefined();
  });

});