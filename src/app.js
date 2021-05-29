const express = require("express");
require("./config/db");
require("dotenv").config();
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const port = process.env.PORT || 3200;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Project1 API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routers/user.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Routes
var user = require("./routers/user");

app.use("/users", user);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
