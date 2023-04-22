import CardResultItem from "@/stories/cards/CardResultItem.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { ResultItem } from "@/types/test";
import { nextTick } from "vue";

const right: ResultItem = { answer: "Пять", choice: "Пять", question: "Five" };
const resultWithChoice: ResultItem = { answer: "Шесть", choice: "Пять", question: "Six" };
const resultWithoutChoice: ResultItem = { answer: "Семь", question: "Seven" };

const component = CardResultItem;
describe("CardResultItem", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  function checkInputs(length: number) {
    const inputs = wrapper.findAll("input[type='radio']");
    expect(inputs).toHaveLength(length);
    inputs.forEach(input => expect(input.attributes().disabled).toBeDefined());
  }

  test("Проверка отрисовки если ответ верен", async () => {
    const item = right;
    wrapper = mountWrapper({ component, props: { item } });
    await nextTick();
    expect(wrapper.find(".right").exists()).toBe(true);
    expect(wrapper.find(".wrong").exists()).toBe(false);

    expect(wrapper.text()).toContain(item.question);
    expect(wrapper.text()).toContain(item.answer);
    expect(wrapper.text()).toContain(item.choice);

    checkInputs(1);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(false);
  });

  test("Проверка отрисовки если ответ не верен и выбор был сделан", async () => {
    const item = resultWithChoice;
    wrapper = mountWrapper({ component, props: { item } });
    await nextTick();
    expect(wrapper.find(".right").exists()).toBe(false);
    expect(wrapper.find(".wrong").exists()).toBe(true);

    expect(wrapper.text()).toContain(item.question);
    expect(wrapper.text()).toContain(item.answer);
    expect(wrapper.text()).toContain(item.choice);

    checkInputs(2);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(true);


  });

  test("Проверка отрисовки если ответ не верен и выбор не был сделан", () => {
    const item = resultWithoutChoice;
    wrapper = mountWrapper({ component, props: { item } });
    expect(wrapper.find(".right").exists()).toBe(false);
    expect(wrapper.find(".wrong").exists()).toBe(true);

    expect(wrapper.text()).toContain(item.question);
    expect(wrapper.text()).toContain(item.answer);
    expect(wrapper.text()).not.toContain(item.choice);

    checkInputs(1);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(false);
  });

});