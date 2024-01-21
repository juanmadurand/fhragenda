import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { fetchApi } from '../../proxy';

// On login callback, we get or create user
const afterCallback = async (req, session) => {
  const { user, accessToken } = session;

  const authId = user?.sub;
  if (!authId) {
    console.error('No user found on session');
    return null;
  }

  try {
    // Get or create user
    await fetchApi('/user', accessToken, {
      method: 'POST',
      body: JSON.stringify({
        nickname: user.nickname,
        name: user.name,
        picture: user.picture,
        email: user.email,
      }),
    });

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
