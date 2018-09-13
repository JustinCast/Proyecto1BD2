var express = require("express");
var router = express.Router();
var queries = require("./queries");

// schemas
router.get("/getSchemas", queries.getSchemas);
router.post("/createSchema", queries.createSchema);
//tables
router.get("/getTableNames", queries.getTableNames);
// procs
router.post("/genInsert", queries.genInsert);
// other
router.get("/getPeople/:schema/:tablename", queries.getPeople);
router.post("/insertPerson/:schema/:tablename", queries.insertPerson);

module.exports = router;