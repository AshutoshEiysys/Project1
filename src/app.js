const express = require("express");
require("./config/db");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();


const port = process.env.PORT || 3200;

//Routes
var user = require("./routers/user");



app.use("/users", user);



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
