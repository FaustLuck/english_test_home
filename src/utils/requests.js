export async function requestPost(path, data) {
  const body = JSON.stringify(data);
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

export async function sendFile(file) {
  const type = file.type;
  if (type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return;
  const data = new FormData();
  data.append(import.meta.env.VITE_fileName, file);
  const res = await fetch(
    `${(import.meta.env.DEV) ? import.meta.env.VITE_dev : import.meta.env.VITE_prod}/upload`, {
      method: "POST",
      body: data
    });
}

function checkJSON(res) {
  return res.headers.get("content-type").includes("application/json");
}