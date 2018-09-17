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
router.post("/genUpdate", queries.genUpdate);
router.post("/genDelete", queries.genDelete);
// other
router.post("/login", queries.login);
router.post("/checkIfProcsExist", queries.checkIfProcsExist);

module.exports = router;