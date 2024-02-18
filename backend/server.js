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

// Code being passed from the frontend
app.get("/getAccessToken", async (req, res) => {
  console.log(req.query.code);

  // prettier-ignore
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json;
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Getting user data
// Access token is going to be passed in as an Authorization header
app.get("/getUserData", async (req, res) => {
  req.get("Authorization"); // Bearer type 'Access_Token'

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json;
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(8000, () => {
  console.log(`Server listening on port 8000...`);
});
