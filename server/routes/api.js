var express = require("express");
var router = express.Router();
var queries = require("./queries");

router.get("/getSchemas", queries.getSchemas);
router.post("/createSchema", queries.createSchema);
router.get("/getTableNames", queries.getTableNames);
router.get("/getPeople/:schema/:tablename", queries.getPeople);
router.post("/insertPerson/:schema/:tablename", queries.insertPerson);

module.exports = router;