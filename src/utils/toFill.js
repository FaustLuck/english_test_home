export function toFill(dictionary, limit) {
  let output = [];
  let tmp = [...dictionary];
  for (let i = 0; i < limit; i++) {
    let item = getRandom(tmp);
    output.push(item);
    tmp = deleteItem(item, tmp);
  }
  return output.sort(compare);

  function deleteItem(item, array) {
    return array.filter((e) => {
      return (item instanceof Object) ? e.question !== item.question : e !== item;
    });
  }

  function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function compare(a, b) {
    return (a.question < b.question) ? -1 : 1;
  }
}