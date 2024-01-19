import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { fetchApi } from '../fetcher';

export const GET = withApiAuthRequired(async function contacts(req) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res);
    const contacts = await fetchApi('/user/contacts', accessToken);

    return NextResponse.json(contacts, res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
