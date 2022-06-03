import { compare } from "@/utils";

export const record = {}

record.add = function add(array, item) {
  let i = array.findIndex(e => e.question === item.question);
  item.answers = item.answers[0];
  if (i > -1) return;
  let newItem = {
    question: item.question,
    answer: item.answers,
  };
  array.push(newItem);
  return array.sort(compare);
};
record.delete = function (array, item) {
  return array.filter(e => e.question !== item.question)
};
record.edit = function (array, item) {
  let i = item.index
  array[i]={
    question: item.question,
    answer: item.answers[0]
  }
  return array
}


