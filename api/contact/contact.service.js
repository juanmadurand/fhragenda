const { query } = require('../db');
const { NotFoundError } = require('../errors');

module.exports.getById = async function (id) {
  const res = await query('SELECT * FROM contacts WHERE id = $1', [id]);

  if (!res || res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
};

module.exports.add = async function (payload) {
  const { user_id, first_name, last_name, email, phone } = payload;
  const res = await query(
    'INSERT INTO contacts (user_id, first_name, last_name, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, first_name, last_name, email, phone]
  ).catch(err => {
    console.error(err);
    return null;
  });

  if (!res || res.rowCount === 0) {
    throw new Error('Failed to add contact');
  }

  return res.rows[0];
};

module.exports.updateById = async function (contact, paramsArr) {
  try {
    await query('BEGIN');

    // Update contact
    const paramsSql = paramsArr.map((p, index) => `${p.field} = $${index + 1}`).join(',');
    const updatedContact = await query(
      `UPDATE contacts SET ${paramsSql}, updated_at = CURRENT_TIMESTAMP WHERE id = $${
        paramsArr.length + 1
      } RETURNING *`,
      [...paramsArr.map(p => p.value), contact.id]
    );

    if (!updatedContact || updatedContact.rowCount === 0) {
      throw new Error('Failed to update contact');
    }

    // Insert history events
    await query(
      `INSERT INTO contacts_history (contact_id, field, old_value, new_value) 
      VALUES ${paramsArr
        .map(
          (p, index) =>
            `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
        )
        .join(', ')}`,
      paramsArr.flatMap(p => [contact.id, p.field, contact[p.field], p.value])
    );

    await query('COMMIT');

    return updatedContact.rows[0];
  } catch (err) {
    console.error(err);
    await query('ROLLBACK');
    throw new Error('Failed to update contact');
  }
};

module.exports.deleteById = async function (id) {
  const res = await query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);

  if (res.rowCount === 0) {
    throw new NotFoundError();
  }

  return res.rows[0];
};

module.exports.getHistory = async function (id) {
  const res = await query('SELECT * FROM contacts_history WHERE contact_id = $1', [id]);

  return res.rows;
};
