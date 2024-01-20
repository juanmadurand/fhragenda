const { client } = require('../db');
const UserService = require('./user.service');

describe('UserService', () => {
  let testUser;

  beforeAll(async () => {
    testUser = await client
      .query(
        'INSERT INTO users (nickname, name, picture, email, auth_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        ['testuser9', 'testuser9@test.com', '#', 'testuser9@test.com', 'testuser|9']
      )
      .then(({ rows }) => rows[0]);

    // Add test contact
    await client
      .query(
        'INSERT INTO contacts (user_id, first_name, last_name, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [testUser.id, 'John', 'Doe', 'john.doe@example.com', '123456789']
      )
      .then(({ rows }) => rows[0]);
  });

  afterAll(async () => {
    await client.query('DELETE FROM users WHERE id = $1', [testUser.id]);
    await client.end();
  });

  describe('getUserByAuthId', () => {
    it('should return a user by auth_id', async () => {
      const user = await UserService.getUserByAuthId(testUser.auth_id);
      expect(user).toBeDefined();
      expect(user.auth_id).toBe(testUser.auth_id);
    });

    it('should return null for non-existent auth_id', async () => {
      const user = await UserService.getUserByAuthId('nonexistent_auth_id');
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const auth_id = 'testuser|new';
      const newUser = {
        nickname: 'newuser',
        name: 'New User',
        picture: '#',
        email: 'newuser@example.com',
        auth_id,
      };

      const createdUser = await UserService.createUser(newUser);
      expect(createdUser).toBeDefined();
      expect(createdUser.auth_id).toBe(auth_id);
    });

    it('should throw an error if creating a user with an existing auth_id', async () => {
      await expect(
        UserService.createUser({
          nickname: 'newuser2',
          name: 'New User',
          picture: '#',
          email: 'newuser2@example.com',
          auth_id: testUser.auth_id,
        })
      ).rejects.toThrow('Error creating user');
    });
  });

  describe('getContactsByUserId', () => {
    it('should return contacts for a valid user ID', async () => {
      const contacts = await UserService.getContactsByUserId(testUser.id);
      expect(contacts).toBeDefined();
      expect(contacts).toBeInstanceOf(Array);
      expect(contacts).toHaveLength(1);
      expect(contacts[0].first_name).toBe('John');
    });

    it('should return an empty array for non-existent user ID', async () => {
      const nonExistentUserId = -1;
      const contacts = await UserService.getContactsByUserId(nonExistentUserId);
      expect(contacts).toBeDefined();
      expect(contacts).toBeInstanceOf(Array);
      expect(contacts).toHaveLength(0);
    });
  });
});
