import CardTestItem from "@/components/cards/CardTestItem.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { TestItem } from "@/types";
import { useTestStore } from "@/store/test";

const component = CardTestItem;

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
    wrapper = mountWrapper({ component });
    expect(wrapper.text()).toContain("Loading");
  });

  test("Отрисовка если данные доступны", () => {
    const item: TestItem = createTest()[3];
    wrapper = mountWrapper({ component, props: { item } });
    expect(wrapper.text()).toContain(item.question);
    item.answer.forEach(el=>{
      expect(wrapper.text()).toContain(el)
    })
  });

  test("Тестирование выбора варианта ответа", async () => {
    const testArray = createTest();
    const i = Math.round(Math.random() * (testArray.length - 1));
    const choiceIndex = Math.round(Math.random() * (testArray[i].answer.length - 1));
    const initialState = { test: { test: testArray } };
    wrapper = mountWrapper({ component, props: { item: testArray[i] } }, initialState);
    const inputs = wrapper.findAll("input[type='radio']");
    expect(inputs).toHaveLength(testArray[i].answer.length);

    await inputs[choiceIndex].trigger("change");
    expect(useTestStore().test[i].choice).toBe(testArray[i].answer[choiceIndex]);
  });
});