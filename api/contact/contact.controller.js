const express = require('express');
const ContactsService = require('./contact.service');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const contact = await ContactsService.getById(req.params.id);

  res.json(contact);
});

router.post('/', async (req, res) => {
  const contact = await ContactsService.add(req.params);

  res.json(contact);
});

router.put('/:id', async (req, res) => {
  const contact = await ContactsService.updateById(req.params.id);

  res.json(contact);
});

router.delete('/:id', async (req, res) => {
  const contact = await ContactsService.deleteById(req.params.id);

  res.json(contact);
});

// Get history
router.get('/:id/history', async (req, res) => {
  const contact = await ContactsService.getHistory(req.params.id);

  res.json(contact);
});

module.exports = router;
