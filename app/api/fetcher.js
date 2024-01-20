const API_PORT = process.env.API_PORT || 3001;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${API_PORT}/api`;

export async function fetchApi(url, accessToken, extraParams = {}) {
  return fetch(`${API_BASE_URL}${url}`, {
    ...extraParams,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
