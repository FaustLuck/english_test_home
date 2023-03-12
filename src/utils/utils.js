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

export async function requestPost(path, data) {
  const body =  JSON.stringify(data)
  const response = await fetch(`${(import.meta.env.DEV) ? import.meta.env.VITE_dev : import.meta.env.VITE_prod}${path}`, {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body
  });
  if (response.ok) {
    return (checkJSON(response)) ? await response.json() : await response.text();
  } else {
    return false;
  }
}

export async function requestGet(path) {
  const response = await fetch(`${(import.meta.env.DEV) ? import.meta.env.VITE_dev : import.meta.env.VITE_prod}${path}`);
  if (response.ok) {
    return (checkJSON(response)) ? await response.json() : await response.text();
  } else {
    return false;
  }
}

function checkJSON(res) {
  return res.headers.get("content-type").includes("application/json");
}