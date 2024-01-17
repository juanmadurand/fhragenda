require("dotenv").config({ path: "./.env.local" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_BASE_URL,
  API_PORT = 3001,
} = process.env;

if (!AUTH0_AUDIENCE || !AUTH0_ISSUER_BASE_URL || !AUTH0_BASE_URL) {
  throw new Error(
    "Please make sure that the file .env.local is in place and populated"
  );
}

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

app.use(cors({ origin: AUTH0_BASE_URL })); // allows requests from frontend
app.use(helmet()); // just a good security practice

app.get("/api/private", checkJwt, (req, res) => {
  res.send({
    msg: "Success",
  });
});

// Global error handler outputs json
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Unknown error",
  });
});

const server = app.listen(API_PORT, () =>
  console.log(`API Server listening on port ${API_PORT}`)
);
process.on("SIGINT", () => server.close());
