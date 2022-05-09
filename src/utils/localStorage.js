export function setUID(uid) {
  window.localStorage.setItem('uid', uid)
}

export function getUID() {
  return window.localStorage.getItem('uid')
}