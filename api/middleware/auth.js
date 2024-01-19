const { auth } = require('express-oauth2-jwt-bearer');
const { getUserByAuthId } = require('../user/user.service');

// Parse token and inject auth_id on request
const requireToken = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

const injectReqUser = async (req, res, next) => {
  try {
    const authId = req.auth?.payload?.sub;
    if (!authId) {
      return next();
    }

    const user = await getUserByAuthId(authId);
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    console.error('Error in injectReqUser:', error);
    next(error);
  }
};

const requireUser = [
  requireToken,
  injectReqUser,
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }
    next();
  },
];

module.exports = { requireToken, requireUser };
