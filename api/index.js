require('dotenv').config({ path: './.env.local' });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const router = require('./router');

const {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_BASE_URL,
  API_PORT = 3001,
} = process.env;

if (!AUTH0_AUDIENCE || !AUTH0_ISSUER_BASE_URL || !AUTH0_BASE_URL) {
  throw new Error('Please make sure that the file .env.local is in place and populated');
}

app.use(cors({ origin: AUTH0_BASE_URL })); // allows requests from frontend
app.use(helmet()); // just a good security practice

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Global error handler outputs json
app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Unknown error',
  });
});

// For any other route, we return a 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
  });
});

const server = app.listen(API_PORT, () =>
  console.log(`API Server listening on port ${API_PORT}`)
);
process.on('SIGINT', () => server.close());
