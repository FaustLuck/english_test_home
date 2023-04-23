import Test from "@/stories/calendar/Test.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { HistoryRecord } from "@/types/history";
import { expect } from "vitest";
import { useHistoryStore } from "../../../src/store/history";

const component = Test;
const result: HistoryRecord = {
  "key": "key_test_1",
  "timestamp": 1678204080000,
  "info": { "correct": 8, "questions": 10, "timeLeft": 143, "timeSpent": 157 },
  "test": {
    "easy": [{
      "answer": "Россия", "choice": "Россия", "question": "Russia"
    }, {
      "answer": "Нет", "choice": "Нет", "question": "No"
    }, {
      "answer": "Бабушка", "choice": "Бабушка", "question": "Grandmother"
    }, {
      "answer": "Пока", "choice": "Пока", "question": "Bye"
    }],
    "hard": [{
      "answer": "His brother is from China", "choice": "He is from Africa", "question": "Where is his brother from?"
    }, {
      "answer": "She is Tanya", "choice": "She is Tanya", "question": "Who is she?"
    }, {
      "answer": "Her name is Tanya", "choice": "Her name is Tanya", "question": "What is her name?"
    }],
    "medium": [{
      "answer": "Сколько ему лет?", "choice": "Как её зовут?", "question": "How old is he?"
    }, {
      "answer": "Как тебя зовут?", "choice": "Как тебя зовут?", "question": "What is your name?"
    }, {
      "answer": "Как твой папа?", "choice": "Как твой папа?", "question": "How is your father?"
    }]
  }
};
const propsLoaded = {
  sub: "sub_user_1",
  result
};
const propsMustBeLoad = {
  sub: "sub_user_1",
  result: {
    "key": "key_test_1",
    "timestamp": 1678204080000,
    "info": { "correct": 8, "questions": 10, "timeLeft": 143, "timeSpent": 157 },
  }
};

vi.mock("useHistoryStore", () => ({
  getResult: () => vi.fn()
}));


describe("Test", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Клик меняет режим отображения 0>1>2>0", async () => {
    const props = propsLoaded;
    wrapper = mountWrapper({ component, props });

    const title = wrapper.find(".v-card");
    expect(wrapper.vm.mode).toBe(0);

    await title.trigger("click");
    expect(wrapper.vm.mode).toBe(1);

    await title.trigger("click");
    expect(wrapper.vm.mode).toBe(2);

    await title.trigger("click");
    expect(wrapper.vm.mode).toBe(0);
  });

  test("Если данные теста загружены, запроса нет", () => {
    const props = propsLoaded;
    wrapper = mountWrapper({ component, props });
    expect(useHistoryStore().getResult).not.toHaveBeenCalled();
  });

  test("Если данные теста не загружены, отправляется запрос", async () => {
    const props = propsMustBeLoad;
    wrapper = mountWrapper({ component, props });
    const title = wrapper.find(".v-card");
    await title.trigger("click");
    const year = new Date(props.result.timestamp).getFullYear();
    expect(useHistoryStore().getResult)
      .toHaveBeenCalledWith(props.sub, props.result.key, year);
  });
});