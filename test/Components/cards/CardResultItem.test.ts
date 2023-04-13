import CardResultItem from "@/stories/cards/CardResultItem.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { ResultItem } from "@/types/test";
import { expect } from "vitest";

const right: ResultItem = { answer: "Пять", choice: "Пять", question: "Five" };
const resultWithChoice: ResultItem = { answer: "Шесть", choice: "Пять", question: "Six" };
const resultWithoutChoice: ResultItem = { answer: "Семь", question: "Seven" };


describe("CardResultItem", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  function checkInputs(length:number){
    const inputs = wrapper.findAll("input[type='radio']");
    expect(inputs.length).toBe(length)
    inputs.forEach(input => expect(input.attributes().disabled).toBeDefined());
  }

  test("Проверка отрисовки если ответ верен", () => {
    const item = right;
    wrapper = mountWrapper({ component: CardResultItem, props: { item } });
    expect(wrapper.find(".right").exists()).toBe(true);
    expect(wrapper.find(".wrong").exists()).toBe(false);

    expect(wrapper.text().search(item.question) > -1).toBe(true);
    expect(wrapper.text().search(item.answer) > -1).toBe(true);
    // @ts-ignore
    expect(item.choice && wrapper.text().search(item.choice) > -1).toBe(true);

    checkInputs(1)

    const icons = wrapper.findAll(".v-icon");
    expect(icons.length).toBe(1);
    expect(icons[0].attributes().class.search("marked") > -1).toBe(true);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(false);
  });

  test("Проверка отрисовки если ответ не верен и выбор был сделан", () => {
    const item = resultWithChoice;
    wrapper = mountWrapper({ component: CardResultItem, props: { item } });
    expect(wrapper.find(".right").exists()).toBe(false);
    expect(wrapper.find(".wrong").exists()).toBe(true);

    expect(wrapper.text().search(item.question) > -1).toBe(true);
    expect(wrapper.text().search(item.answer) > -1).toBe(true);
    // @ts-ignore
    expect(item.choice && wrapper.text().search(item.choice) > -1).toBe(true);

    checkInputs(2)

    const icons = wrapper.findAll(".v-icon");
    expect(icons.length).toBe(2);
    expect(icons[0].attributes().class.search("blank") > -1).toBe(true);
    expect(icons[1].attributes().class.search("marked") > -1).toBe(true);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(true);


  });

  test("Проверка отрисовки если ответ не верен и выбор был сделан", () => {
    const item = resultWithoutChoice;
    wrapper = mountWrapper({ component: CardResultItem, props: { item } });
    expect(wrapper.find(".right").exists()).toBe(false);
    expect(wrapper.find(".wrong").exists()).toBe(true);

    expect(wrapper.text().search(item.question) > -1).toBe(true);
    expect(wrapper.text().search(item.answer) > -1).toBe(true);
    // @ts-ignore
    expect( !!item.choice && wrapper.text().search(item.choice) > -1).toBe(false);

    checkInputs(1)

    const icons = wrapper.findAll(".v-icon");
    expect(icons.length).toBe(1);
    expect(icons[0].attributes().class.search("blank") > -1).toBe(true);

    expect(wrapper.find(".title-right").exists()).toBe(true);
    expect(wrapper.find(".title-wrong").exists()).toBe(false);
  });

});