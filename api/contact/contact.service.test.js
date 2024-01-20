require('dotenv').config({ path: './.env.local' });
const { query, client } = require('../db');
const { NotFoundError } = require('../errors');
const ContactsService = require('./contact.service');

describe('ContactsService', () => {
  let userId;
  let testContact;

  beforeAll(async () => {
    // Insert a test user and contact for the tests
    const user = await query(
      `INSERT INTO users (nickname, name, picture, email, auth_id)
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)
        RETURNING *`,
      [
        'testuser9',
        'testuser9@test.com',
        'https://s.gravatar.com/avatar/mock.png',
        'testuser9@test.com',
        'testuser|9',
      ]
    ).then(({ rows }) => rows[0]);

    userId = user.id;

    testContact = await query(
      'INSERT INTO contacts (user_id, first_name, last_name, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [userId, 'John', 'Doe', 'john.doe@example.com', '123456789']
    ).then(({ rows }) => rows[0]);
  });

  afterAll(async () => {
    // This will cascade to other tables
    await query('DELETE FROM users WHERE id = $1', [userId]);
    await client.end();
  });

  describe('getById', () => {
    it('should return a contact by ID', async () => {
      const contact = await ContactsService.getById(testContact.id);
      expect(contact).toBeDefined();
      expect(contact.id).toBe(testContact.id);
    });

    it('should return null for non-existent contact ID', async () => {
      const contact = await ContactsService.getById(-1);
      expect(contact).toBeNull();
    });
  });

  describe('add', () => {
    it('should add a new contact', async () => {
      const newContact = {
        user_id: userId,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        phone: '987654321',
      };

      const addedContact = await ContactsService.add(newContact);
      expect(addedContact).toBeDefined();
      expect(addedContact.email).toBe(newContact.email);
    });

    it('should throw an error if adding a contact with an existing email', async () => {
      const existingContact = {
        user_id: userId,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '111222333',
      };

      await expect(ContactsService.add(existingContact)).rejects.toThrow(
        'Failed to add contact'
      );
    });
  });

  describe('updateById', () => {
    it('should update a contact and add a history entry', async () => {
      const updatedName = 'Bob';
      const updatedField = 'first_name';
      const contact = await ContactsService.getById(testContact.id);
      const paramsArr = [{ field: updatedField, value: updatedName }];

      const updatedContact = await ContactsService.updateById(contact, paramsArr);

      expect(updatedContact).toBeDefined();
      expect(updatedContact[updatedField]).toBe(updatedName);

      const history = await ContactsService.getHistory(testContact.id);
      expect(history).toHaveLength(1);
      expect(history[0].field).toBe(updatedField);
      expect(history[0].old_value).toBe(contact[updatedField]);
      expect(history[0].new_value).toBe(updatedName);
    });

    it('should throw an error if updating a non-existent contact', async () => {
      const nonExistentContact = { id: -1 };
      const paramsArr = [{ field: 'first_name', value: 'UpdatedName' }];

      await expect(
        ContactsService.updateById(nonExistentContact, paramsArr)
      ).rejects.toThrow('Failed to update contact');
    });
  });

  describe('getHistory', () => {
    it('should fetch contact history', async () => {
      const history = await ContactsService.getHistory(testContact.id);
      console.log('history', history);
      expect(history).toBeDefined();
      expect(history).toBeInstanceOf(Array);
      expect(history).toHaveLength(1);
      expect(history[0].contact_id).toBe(testContact.id);
    });
  });

  describe('deleteById', () => {
    it('should delete a contact', async () => {
      const deletedContact = await ContactsService.deleteById(testContact.id);
      expect(deletedContact).toBeDefined();
      expect(deletedContact.id).toBe(testContact.id);

      const contactAfterDeletion = await ContactsService.getById(testContact.id);
      expect(contactAfterDeletion).toBeNull();
    });

    it('should throw an error if deleting a non-existent contact', async () => {
      const nonExistentContactId = -1;
      await expect(ContactsService.deleteById(nonExistentContactId)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
