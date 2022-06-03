import store from '@/store'

export function getDate() {
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

export function setUID(uid) {
  window.localStorage.setItem('uid', uid)
}

export function getUID() {
  return window.localStorage.getItem('uid')
}

export async function speech(text) {
  let speech = store.getters['settings/getSpeech'];
  try {
    let response = await fetch(speech + text)
    if (response.ok) {
      let blob = await response.blob()
      let src = URL.createObjectURL(blob)
      const audio = new Audio(src);
      await audio.play()
    }
  } catch (e) {
    console.log(e)
  }
}

export function compare(a, b) {
  if (a.question < b.question) return -1;
  if (a.question > b.question) return 1;
  return 0;
}

