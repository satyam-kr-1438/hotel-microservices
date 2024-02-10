"use strict";
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const db = require("./models/index");
const bodyParser = require("body-parser");
const Router = require("./routes/index");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setTimeout(
  () =>
    db.sequelize
      .authenticate()
      .then(() => {
        db.sequelize.sync({ force: false });
        console.log(`Authenticated`);
      })
      .catch((err) => console.log(`Error occurred `, err)),
  10000
);

const port =  process.env.PORT || 5004;
const dbPort = 5433;

app.use("/api/wallet", Router);

process.on("unhandledRejection", (err) => {
  console.log(err, "err");
});

app.listen(port, () =>
  console.log(
    `server is listening at ${port} and database is running at ${dbPort}`
  )
);
