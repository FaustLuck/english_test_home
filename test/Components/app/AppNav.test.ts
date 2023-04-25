import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { h, nextTick } from "vue";
import AppNav from "@/components/app/AppNav.vue";
import HelperWrapper from "../../HelperWrapper.vue";
import { User } from "@/types";
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
      default: h(AppNav, { isCollapsed }),
    },
  }, initialState);
}

describe("AppNav", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка сайд бара в свернутом состоянии", async () => {
    wrapper = wrap(true);
    await nextTick();
    expect(wrapper.findAll(".v-navigation-drawer__append")).toHaveLength(0);
    expect(wrapper.html()).not.toContain('350px')
  });

  test("Отрисовка сайд бара в развернутом состоянии", async () => {
    wrapper = wrap();
    await nextTick();
    expect(wrapper.findAll(".v-navigation-drawer__append")).toHaveLength(1);
    expect(wrapper.html()).toContain('350px')
  });

  test("Отрисовка списка пользователей", async () => {
    wrapper = wrap();
    expect(wrapper.text()).not.toContain('Пользователи')
    useHistoryStore().users = users;
    await nextTick();
    expect(wrapper.text()).toContain('Пользователи')

    const items = wrapper
      .findAll(".v-list-item")
      .filter(el => el.text().search("name_") > -1);

    expect(items).toHaveLength(3);
    items.forEach((item, i) => {
      expect(wrapper.text()).toContain(users[i].name)
      expect(wrapper.html()).toContain(`src="${users[i].picture}"`)
    });
  });
});