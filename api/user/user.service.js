const { query } = require('../db');

module.exports.getUserByAuthId = async function (id) {
  const res = await query('SELECT * FROM users WHERE auth_id = $1::text', [id]);

  if (res.rowCount === 0) {
    return null;
  }
  return res.rows[0];
};

module.exports.createUser = async function (payload) {
  const { nickname, name, picture, email, auth_id } = payload;
  const result = await query(
    `INSERT INTO users 
      (nickname, name, picture, email, auth_id) 
      VALUES ($1::text, $2::text, $3::text, $4::text, $5::text) 
      RETURNING *
    `,
    [nickname, name, picture, email, auth_id]
  );

  if (!result) {
    console.error('create user failed with params: ', payload);
    return null;
  }

  return result.rows[0];
};

module.exports.getContactsByUserId = async function (id) {
  const res = await query('SELECT * FROM contacts WHERE user_id = $1', [id]);

  return res.rows;
};
