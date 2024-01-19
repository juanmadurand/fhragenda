const express = require('express');
const { requireUser } = require('./middleware/auth');
const router = express.Router();

router.use('/contact', requireUser, require('./contact/contact.controller'));
router.use('/user', require('./user/user.controller'));

module.exports = router;
