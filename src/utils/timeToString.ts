export function timeToString(time: number) {
  let sec = (time % 60);
  let min = (time - sec) / 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}