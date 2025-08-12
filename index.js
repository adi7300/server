// npm run server
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addCustomer } = require("./src/dbService/db.service.js");
const {
  createPaxFolder,
  createSpreadsheet,
} = require("./src/GoogleSheets/google-sheets");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ mss: "hello world" });
});
app.post("/api/submitForm", async (req, res) => {
  console.log("🚀 ~ file: index.js:17 ~ app.post ~ req:");
  try {
    await addCustomer(req.body);
    await createPaxFolder(req.body);
    await createSpreadsheet(req, res);
  } catch (error) {
    console.error("Error is:", error);
  }
});

// Export the app for Vercel serverless functions
module.exports = app;

// Only listen when running locally (not in Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
