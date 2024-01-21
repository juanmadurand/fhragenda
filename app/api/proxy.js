import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

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

export async function proxy(req, url, params = {}) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);

    if (req.body) {
      const body = await req.json().catch(() => null);

      if (body) {
        params.body = JSON.stringify(body);
      }
    }
    const contacts = await fetchApi(url, accessToken, params);

    return NextResponse.json(contacts, res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
