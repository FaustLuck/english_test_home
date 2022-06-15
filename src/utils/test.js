import { compare } from "@/utils";
import { getDate } from "@/utils";

export const test = {
  create: function ({ dictionary, limits, variants }) {
    let test = {};
    let answer = {};
    for (let difficult in dictionary) {
      let localDictionary = dictionary[difficult];
      let limit = limits[difficult];
      let questions = toFill(localDictionary, limit).sort(compare);
      answer[difficult] = [...questions];
      answer[difficult] = answer[difficult].map((e) => {
        return {
          answer: undefined,
          question: e.question,
        };
      });
      questions = toFillVariants(limit, questions, localDictionary, variants);
      test[difficult] = questions;
    }
    return [test, answer];
  },
  cancel: function (answers, timeSpent, reason, { dictionary }) {
    let questions = Object.values(answers).reduce(
      (acc, cur) => acc + cur.length,
      0
    );
    for (let difficult in dictionary) {
      for (let answer of answers[difficult]) {
        let correctAnswer = dictionary[difficult].find(
          (e) => e.question === answer.question
        );
        if (!answer.answer) answer.answer = "Не выбрано";
        answer.answer =
          correctAnswer.answer === answer.answer
            ? [correctAnswer.answer]
            : [answer.answer, correctAnswer.answer].sort();
        answer.correct = answer.answer.length === 1;
        answer.index = answer.answer.findIndex(
          (e) => e === correctAnswer.answer
        );
      }
    }
    let correctAnswers = 0;
    Object.values(answers).forEach((e) => {
      correctAnswers += e.reduce((acc, cur) => acc + cur.answer.length, 0);
    });
    correctAnswers = questions * 2 - correctAnswers;
    let data = {};
    let [date, time] = getDate();
    data[date] = {};
    data[date][time] = {
      test:answers,
      congratulations: correctAnswers === questions,
      reason,
      ["time spent"]: timeSpent,
      questions,
      correctAnswers,
    };
    return data;
  },
};

function toFillVariants(limit, questions, dictionary, limitVariant) {
  for (let i = 0; i < limit; i++) {
    let question = { ...questions[i] };
    let correctAnswer = question.answer;
    let variants = toFill(
      dictionary.map((e) => e.answer).filter((e) => e !== correctAnswer),
      limitVariant - 1
    );
    variants.push(correctAnswer);
    variants.sort();
    question.answer = variants;
    questions[i] = { ...question };
  }
  return questions;
}

function toFill(array, limit) {
  let output = [];
  let tmp = [...array];
  for (let i = 0; i < limit; i++) {
    let item = getRandom(tmp);
    output.push(item);
    tmp = deleteItem(item, tmp);
  }
  return output;
}

function deleteItem(item, array) {
  return array.filter((e) => {
    if (item instanceof Object) {
      return e.question !== item.question;
    }
    return e !== item;
  });
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
