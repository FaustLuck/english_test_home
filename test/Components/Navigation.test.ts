import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../mountWithVuetify";
import { h, nextTick } from "vue";
import Navigation from "@/stories/Navigation.vue";
import HelperWrapper from "../HelperWrapper.vue";
import { describe, expect, test } from "vitest";
import { User } from "@/types/history";
import { useHistoryStore } from "@/store/history";

const component = HelperWrapper;

function createUsers() {
  const output = [];
  for (let i = 0; i < 3; i++) {
    output.push({
      key: `key_${i}`,
      name: `name_${i}`,
      picture: `picture_${i}`,
      privileged: false,
      sub: `sub_${i}`,
      minYear: 2022
    });
  }
  return output;
}

const users: User[] = createUsers();

function wrap(isCollapsed = false, initialState = {}) {
  return mountWrapper({
    component,
    slots: {
      default: h(Navigation, { isCollapsed }),
    },
  }, initialState);
}

describe("Navigation", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка сайд бара в свернутом состоянии", async () => {
    wrapper = wrap(true);
    await nextTick();
    expect(wrapper.findAll(".v-navigation-drawer__append")).toHaveLength(0);
    expect(wrapper.html().search("350px") > -1).toBe(false);
  });

  test("Отрисовка сайд бара в развернутом состоянии", async () => {
    wrapper = wrap();
    await nextTick();
    expect(wrapper.findAll(".v-navigation-drawer__append")).toHaveLength(1);
    expect(wrapper.html().search("350px") > -1).toBe(true);
  });

  test("Отрисовка списка пользователей", async () => {
    wrapper = wrap();
    expect(wrapper.text().search("Пользователи") > -1).toBe(false);
    useHistoryStore().users = users;
    await nextTick();
    expect(wrapper.text().search("Пользователи") > -1).toBe(true);

    const items = wrapper
      .findAll(".v-list-item")
      .filter(el => el.text().search("name_") > -1);

    expect(items).toHaveLength(3);
    items.forEach((item, i) => {
      expect(wrapper.text().search(users[i].name) > -1).toBe(true);
      expect(wrapper.html().search(`src="${users[i].picture}"`) > -1).toBe(true);
    });
  });
});