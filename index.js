// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import DBService from './src/dbService/db.service.mjs'
// import googleSheets from './src/GoogleSheets/google-sheets.js';
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
// const PORT = 3001;

app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ mss: "hello world" });
});
app.post("/api/submitForm", async (req, res) => {
  console.log("🚀 ~ file: index.js:17 ~ app.post ~ req:", req.body);
  try {
    // await addCustomer(req.body); //TODO: need to be uncommented before deploying
    await createPaxFolder(req.body);
    await createSpreadsheet(req, res);
  } catch (error) {
    console.error("Error is:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
