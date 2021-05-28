const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect( process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
