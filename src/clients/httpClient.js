export async function HttpClient(
  method, // : 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url,
  fetchOptions,
  authorization
) {
  const defaultHeaders = fetchOptions.headers || {};
  return fetch(url, {
    ...fetchOptions,
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      ...defaultHeaders,
      Authorization: authorization ? `Bearer ${authorization}` : "",
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  }).then(async (response) => {
    return {
      ok: response.ok,
      body: await response.json(),
    };
  });
}

export async function HttpClientGet(url, fetchOptions = {}, authorization) {
  const defaultHeaders = fetchOptions.headers || {};
  return fetch(url, {
    ...fetchOptions,
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      ...defaultHeaders,
      Authorization: authorization ? `Bearer ${authorization}` : "",
    },
  }).then(async (response) => {
    return {
      ok: response.ok,
      body: await response.json(),
    };
  });
}
