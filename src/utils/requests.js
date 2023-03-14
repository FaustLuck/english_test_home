const PATH = (import.meta.env.DEV) ? `${import.meta.env.VITE_dev}` : `${import.meta.env.VITE_prod}`;

export async function requestPost(path, data) {
  const body = JSON.stringify(data);
  const response = await fetch(`${PATH}${path}`, {
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
  const response = await fetch(`${PATH}${path}`);
  if (response.ok) {
    return (checkJSON(response)) ? await response.json() : await response.text();
  } else {
    return false;
  }
}

export async function sendFile(file, flag) {
  const type = file.type;
  if (type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return;
  const data = new FormData();
  data.append(import.meta.env.VITE_fileName, file);
  data.append(import.meta.env.VITE_flagName, `${flag}`);
  await fetch(
    `${PATH}/settings/upload`, {
      method: "POST",
      body: data
    });
}

function checkJSON(res) {
  return res.headers.get("content-type").includes("application/json");
}