import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { proxy } from '@/app/api/proxy';

export const POST = withApiAuthRequired(async function contacts(req) {
  return proxy(req, '/contact', { method: 'POST' });
});
