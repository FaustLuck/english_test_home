import CardTestItem from "@/stories/cards/CardTestItem.vue";
import { describe, expect, test } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { TestItem } from "@/types/test";
import { useTestStore } from "@/store/test";
import { nextTick } from "vue";

function createTest() {
  const test: TestItem[] = [];
  for (let i = 0; i < 6; i++) {
    test.push({
      key: `key_${i}`,
      question: `question_${i}`,
      answer: new Array(4).fill(undefined).map((el, j) => `answer_${i}_${j}`)
    });
  }
  return test;
}

describe("CardTestItem", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка если нет данных", () => {
    wrapper = mountWrapper({ component: CardTestItem });
    expect(wrapper.text().search("Loading") > -1).toBe(true);
  });

  test("Отрисовка если данные доступны", () => {
    const item: TestItem = createTest()[3];
    wrapper = mountWrapper({ component: CardTestItem, props: { item } });
    expect(wrapper.text().search(item.question) > -1).toBe(true);
    expect(item.answer.every(el => wrapper.text().search(el) > -1)).toBe(true);
  });

  test("Тестирование выбора варианта ответа", async () => {
    const testArray = createTest();
    const i = Math.round(Math.random() * (testArray.length - 1));
    const choiceIndex = Math.round(Math.random() * (testArray[i].answer.length - 1));
    const initialState = { test: { test: testArray } };
    wrapper = mountWrapper({
      component: CardTestItem, props: { item: testArray[i] }
    }, initialState);
    const inputs = wrapper.findAll("input[type='radio']");
    expect(inputs.length).toBe(testArray[i].answer.length);

    await inputs[choiceIndex].trigger("change");
    expect(useTestStore().test[i].choice).toBe(testArray[i].answer[choiceIndex]);
  });
});