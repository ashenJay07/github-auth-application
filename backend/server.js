require("dotenv").config();

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var axios = require("axios");

const { CLIENT_ID, CLIENT_SECRET } = process.env;

var app = express();

app.use(cors());
app.use(bodyParser.json());

// Code being passed from the frontend
app.get("/getAccessToken", async (req, res) => {
  // prettier-ignore
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
  // prettier-ignore
  const tokenRequestURL = "https://github.com/login/oauth/access_token" + params;

  try {
    await axios({
      url: tokenRequestURL,
      method: "post",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      res.json(response.data);
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Getting user data
// Access token is going to be passed in as an Authorization header
app.get("/getUserData", async (req, res) => {
  try {
    await axios({
      url: "https://api.github.com/user",
      method: "get",
      headers: {
        Authorization: req.get("Authorization"),
      },
    }).then((response) => {
      res.json(response.data);
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(8000, () => {
  console.log(`Server listening on port 8000...`);
});
