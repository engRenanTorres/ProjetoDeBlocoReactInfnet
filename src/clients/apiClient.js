const baseUrl = "https://fakestoreapi.com";

export const APIClient = {
  get: async (endpoint, fetchOptions = {}, authorization) => {
    const defaultHeaders = fetchOptions.headers || {};
    return fetch(`${baseUrl}${endpoint}`, {
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
  },
  post: async (endpoint, body, fetchOptions = {}, authorization) => {
    const defaultHeaders = fetchOptions.headers || {};
    return fetch(`${baseUrl}${endpoint}`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(body),
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
  },
  put: async (endpoint, id, body, fetchOptions = {}, authorization) => {
    const defaultHeaders = fetchOptions.headers || {};
    return fetch(`${baseUrl}${endpoint}/${id}`, {
      ...fetchOptions,
      method: "PUT",
      body: JSON.stringify(body),
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
  },
};
