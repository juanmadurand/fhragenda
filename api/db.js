const { Client, types } = require('pg');

// Prevent timezone conversion
types.setTypeParser(types.builtins.TIMESTAMP, function (val) {
  return val;
});

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

client.connect();

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing PostgreSQL connection...');
  await client.end();
  process.exit();
});

module.exports.client = client;
module.exports.query = async (sqlStr, params = null) => {
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
