import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { proxy } from '../proxy';

export const POST = withApiAuthRequired(async function contacts(req) {
  return proxy(req, '/contact', { method: 'POST' });
});
