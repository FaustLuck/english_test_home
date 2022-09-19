function compare(a, b) {
  return (a.question < b.question) ? -1 : 1;
}

export function toFill(dictionary, limit) {
  let output = [];
  let tmp = [...dictionary];
  for (let i = 0; i < limit; i++) {
    let item = getRandom(tmp);
    output.push(item);
    tmp = deleteItem(item, tmp);
  }
  return output.sort(compare);
}

function deleteItem(item, array) {
  return array.filter((e) => {
    return (item instanceof Object) ? e.question !== item.question : e !== item;
  });
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getDate(timestamp) {
  return new Intl.DateTimeFormat("ru-Ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(parseInt(timestamp)))
    .split(", ");
}