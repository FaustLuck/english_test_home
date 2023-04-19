import CardResultInfo from "@/stories/cards/CardResultInfo.vue";
import { VueWrapper } from "@vue/test-utils";
import { mountWrapper } from "../../mountWithVuetify";
import { Result } from "@/types/test";

const component = CardResultInfo;
const timestamp = 1681402917884;
const result: Result = {
  easy: [
    {
      answer: "Оно",
      choice: "Твой, ваш",
      question: "It"
    },
    {
      answer: "Мой, моё",
      choice: "Пока",
      question: "My"
    },
    {
      answer: "Где",
      choice: "Оно",
      question: "Where"
    },
    {
      answer: "Ты, вы",
      choice: "Пять",
      question: "You"
    }
  ],
  medium: [
    {
      answer: "Как твой папа?",
      question: "How is your father?"
    },
    {
      answer: "Сколько тебе лет?",
      question: "How old are you?"
    },
    {
      answer: "Кто ты?",
      question: "Who are you?"
    }
  ]
};
describe("CardResultInfo", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper.unmount();
  });

  test("Отрисовка после загрузки (пропущена сложность 'hard'", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: 5, result } });

    expect(wrapper.text()).toContain("easy");
    expect(wrapper.text()).toContain("medium");
    expect(wrapper.text()).not.toContain("hard");
  });
});