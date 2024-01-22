const { defineConfig } = require('cypress');
const { Client } = require('pg');

require('dotenv').config();

const queryDB = async query => {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  });
  await client.connect();
  console.log('query', query);
  const res = await client.query(query);
  console.log('res', res);
  await client.end();
  return res.rows;
};

module.exports = defineConfig({
  projectId: 'dcn8g1',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('task', {
        queryDB,
        async cleanDB() {
          // Remove test user and cascade contacts/history
          const result = await queryDB(
            `DELETE FROM users where auth_id = '${process.env.CY_TEST_AUTH_ID}'`
          );

          console.log('result', result);

          return 'Database cleaned successfully';
        },
      });
    },
  },

  env: {
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    CY_TEST_USERNAME: process.env.CY_TEST_USERNAME,
    CY_TEST_PASSWORD: process.env.CY_TEST_PASSWORD,
    CY_TEST_AUTH_ID: process.env.CY_TEST_AUTH_ID,
  },
});
