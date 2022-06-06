import { compare } from "@/utils";

export const test = {
  create: function ({ order, dictionary, limits, variants }) {
    let test = {};
    let answers = {};
    for (let difficult of order) {
      let localDictionary = dictionary[difficult];
      let limit = limits[difficult];
      let questions = toFill(localDictionary, limit).sort(compare);
      answers[difficult] = questions.map((e) => {
        return {
          question: e.question,
          answer: [
            {
              answer: "Не выбрано",
              correct: false,
            },
            e.answer,
          ],
        };
      });
      questions = toFillVariants(limit, questions, localDictionary, variants);
      test[difficult] = questions;
    }
    return [test, answers];
  },
  cancel: function (answers, limits) {
    let questions = Object.values(limits).reduce(
      (acc, cur) => acc + cur,
      0
    );
    let correctAnswers = 0;
    Object.values(answers).forEach((e) => {
      correctAnswers += e.reduce((acc, cur) => acc + cur.answer.length, 0);
    });
    correctAnswers = questions * 2 - correctAnswers;
    return {
      answers,
      congratulations: correctAnswers === questions,
      questions,
      correctAnswers,
    };
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
    let index = variants.findIndex((e) => e === correctAnswer);
    variants[index] = {
      answer: correctAnswer,
      correct: true,
    };
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
