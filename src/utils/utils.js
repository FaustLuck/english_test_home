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

export async function request(path, data, method = "POST") {
  if (data === "") data = {};
  const body = (method === "POST") ? JSON.stringify(data) : null;
  const response = await fetch(`${(import.meta.env.DEV) ? import.meta.env.VITE_dev : import.meta.env.VITE_prod}${path}`, {
    headers: {"Content-Type": "application/json"},
    method,
    body
  });
  if (response.ok) {
    return await response.json();
  } else {
    return false;
  }
}