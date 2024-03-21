const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/Database.js");
const User = require("./models/user.js");
const Code = require("./models/code.js");
const genralRoutes = require("./routes/genral.js");
const judgeRoutes = require("./routes/judge.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));



app.use("/genral", genralRoutes);
app.use("/judge", judgeRoutes);


app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})


Code.belongsTo(User);
User.hasMany(Code);

sequelize
  .sync(
   
  )
  .then((res) => {
    console.log("db synced");
  })
  .catch((e) => {
    // console.log(e);
  });

module.exports = app;
