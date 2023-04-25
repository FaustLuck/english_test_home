import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { nextTick } from "vue";
import AppNav from "@/components/app/AppNav.vue";
import { User } from "@/types";
import { useHistoryStore } from "@/store/history";

const component = AppNav;

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

describe("AppNav", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка списка пользователей", async () => {
    wrapper = mountWrapper({component});
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