const { query } = require('../db');

module.exports.getById = async function (id) {
  const res = await query('SELECT * FROM contacts WHERE id = $1', [id]);

  if (!res || res.rowCount === 0) {
    return null;
  }

  return res.rows[0];
};

module.exports.add = async function (payload) {
  throw new Error('TBD');
};

module.exports.updateById = async function (id) {
  throw new Error('TBD');
};

module.exports.deleteById = async function (id) {
  throw new Error('TBD');
};

module.exports.getHistory = async function (id) {
  throw new Error('TBD');
};
