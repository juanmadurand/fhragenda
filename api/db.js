const { Client } = require('pg');

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

client.connect();

module.exports.query = async (sqlStr, params) => {
  try {
    const res = await client.query(sqlStr, params);
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[query] (${sqlStr})`, { params });
    }
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};
