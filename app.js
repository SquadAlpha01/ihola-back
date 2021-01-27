require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.listen(process.env.PORT, () =>
  console.log(`running on port: ${process.env.PORT}`)
);
