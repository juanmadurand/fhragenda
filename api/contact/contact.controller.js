const express = require('express');
const ContactsService = require('./contact.service');
const { BadRequestError } = require('../errors');
const router = express.Router();

const CONTACT_FIELDS = ['first_name', 'last_name', 'email', 'phone'];

const requireOwnership = async (req, res, next) => {
  const contact = await ContactsService.getById(req.params.id);
  if (!contact) {
    return res.status(404).json({ error: 'NOT FOUND' });
  }
  if (contact.user_id !== req.user.id) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
  req.contact = contact;
  next();
};

// Adds a contact
router.post('/', async (req, res) => {
  const dto = { user_id: req.user.id };

  CONTACT_FIELDS.forEach(key => {
    if (!req.body[key]) {
      throw new BadRequestError('Missing params');
    }
    dto[key] = req.body[key];
  });

  const contact = await ContactsService.add(dto);

  res.json(contact);
});

// Get contact by id
router.get('/:id', requireOwnership, async (req, res) => {
  res.json(req.contact);
});

// Update contact by id
router.put('/:id', requireOwnership, async (req, res) => {
  const params = CONTACT_FIELDS.map(field => ({
    field,
    value: req.body[field],
  })).filter(({ value }) => !!value);

  if (params.length === 0) {
    throw new BadRequestError('Missing params');
  }

  const updatedParams = params.filter(({ field, value }) => req.contact[field] !== value);

  if (updatedParams.length === 0) {
    return res.json(req.contact);
  }

  const updatedContact = await ContactsService.updateById(req.contact, updatedParams);

  res.json(updatedContact);
});

// Delete contact by id
router.delete('/:id', requireOwnership, async (req, res) => {
  await ContactsService.deleteById(req.contact.id);

  res.json({
    status: 'success',
  });
});

// Get history
router.get('/:id/history', requireOwnership, async (req, res) => {
  const contact = await ContactsService.getHistory(req.params.id);

  res.json(contact);
});

module.exports = router;
