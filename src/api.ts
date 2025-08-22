type Params = Record<string, string | number | boolean | null | undefined>;

const API_URL = "https://api.websim.com/api/v1";

const buildUrl = (path: string, params?: Params): URL => {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url;
};

export const get = async <T>(options: {
  path: string;
  params?: Params;
}): Promise<T> => {
  const url = buildUrl(options.path, options.params);
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const post = async <T>(options: {
  path: string;
  params?: Params;
  payload?: Record<string, unknown>;
}): Promise<T> => {
  const url = buildUrl(options.path, options.params);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options.payload ?? {}),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
