const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// API file for interacting with sql server
const api = require("./routes/api");

/**
 * Server config
 */
function config() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}

/**
 * Endpoints Config
 */
function routerConfig() {
  app.use("/api/v1", api);
  // demas enrutadores
  // Angular DIST output folder
  app.use(express.static(__dirname + "/dist"));

  // Send all other requests to the Angular app
  app.get("", (req, res) => {
    res.send({message: 'Servidor escuchando en el puerto 3000'})
  })
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
  });
}

// functions invocations
config();
routerConfig();

//Set Port
app.listen(process.env.PORT || 3000);
