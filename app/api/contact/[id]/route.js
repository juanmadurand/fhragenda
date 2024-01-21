import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { proxy } from '@/app/api/proxy';

export const GET = withApiAuthRequired(async function contacts(req, { params }) {
  const { id } = params;
  return proxy(req, `/contact/${id}`);
});

export const DELETE = withApiAuthRequired(async function contacts(req, { params }) {
  const { id } = params;
  return proxy(req, `/contact/${id}`, { method: 'DELETE' });
});

export const PUT = withApiAuthRequired(async function contacts(req, { params }) {
  const { id } = params;
  return proxy(req, `/contact/${id}`, { method: 'PUT' });
});
