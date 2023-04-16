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

  test("Отрисовка, если пользователь не авторизован", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: -1 } }, {
      test: {
        timeSpent: 155,
        timeLeft: 25,
      }
    });
    expect(wrapper.text().search("Вход не выполнен") > -1).toBe(true);
  });

  test("Отрисовка, если пользователь авторизован", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: -1 } }, {
      test: {
        timeSpent: 155,
        timeLeft: 25,
      },
      auth: {
        name: "UserName"
      }
    });
    expect(wrapper.text().search("Вход не выполнен") > -1).toBe(false);
    expect(wrapper.text().search("UserName") > -1).toBe(true);
  });

  test("Проверка отрисовка даты и времени тестирования", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: -1 } }, {
      test: {
        timeSpent: 155,
        timeLeft: 25,
      }
    });
    expect(wrapper.text().search("13.04.2023 19:21") > -1).toBe(true);
    expect(wrapper.text().search("2:35") > -1).toBe(true);
  });

  test("Отрисовка во время процесса загрузки", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: -1 } }, {
      test: {
        timeSpent: 155,
        timeLeft: 25,
      }
    });
    expect(wrapper.text().search("Loading") > -1).toBe(true);
    expect(wrapper.text().search(/\?\? \/ \?\?/) > -1).toBe(true);
  });

  test("Отрисовка после загрузки (пропущена сложность 'hard'", () => {
    wrapper = mountWrapper({ component, props: { timestamp, correct: 5, result } }, {
      test: {
        timeSpent: 155,
        timeLeft: 25,
      }
    });
    expect(wrapper.text().search('easy')>-1).toBe(true);
    expect(wrapper.text().search('medium')>-1).toBe(true);
    expect(wrapper.text().search('hard')>-1).toBe(false);
    expect(wrapper.text().search('5 / 7'))
  });
});