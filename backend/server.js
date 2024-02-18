require("dotenv").config();

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const fetch = (...args) => {
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
};

const { CLIENT_ID, CLIENT_SECRET } = process.env;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(8000, () => {
  console.log(`Server listening on port 8000...`);
});
