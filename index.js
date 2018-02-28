require("dotenv").config();
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var stripe = require("stripe")(process.env.STRIPE_API_KEY);
var axios = require("axios");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
// app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to the api");
});

app.post("/api/", (req, res) => {
  console.log("req.body", req.body);
  if (req.body.token) {
    console.log(req.body.token);
    const { name } = req.body.token.card;
    stripe.charges.create(
      {
        amount: 2000,
        currency: "eur",
        source: "tok_visa", //  tok_visa utilisez les token de test comme celui-ci
        description: `Charge for ${name}`,
        metadata: { order_id: 6735 }
      },
      function(err, charge) {
        console.log(err, charge);
      }
    );
  } else {
    console.log("Aucun Token transmis");
  }
});

app.listen(3200, () => {
  console.log("server is up!");
});
