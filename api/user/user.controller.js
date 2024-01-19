const express = require('express');
const { getContactsByUserId, getUserByAuthId, createUser } = require('./user.service');
const { requireToken, requireUser } = require('../middleware/auth');
const router = express.Router();

// Creates a new user or return existing
router.post('/', requireToken, async (req, res) => {
  const authId = req.auth.payload.sub;
  let user = await getUserByAuthId(authId);

  if (!user) {
    // User does not exist in our DB yet ~ create it
    const { nickname, name, picture, email } = req.body;

    user = await createUser({
      auth_id: authId,
      nickname,
      name,
      picture,
      email,
    });
  }

  res.json(user);
});

// Get all contacts for user by id
router.get('/contacts', requireUser, async (req, res) => {
  const contacts = await getContactsByUserId(req.user.id);

  res.json(contacts);
});

module.exports = router;
