export default function getDate() {
  let date = new Intl.DateTimeFormat("ru-Ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date())
    .split(", ");
  date[0] = date[0].split(".").reverse().join("-");
  return date;
}
