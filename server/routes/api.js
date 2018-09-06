var express = require("express");
var router = express.Router();
var queries = require("./queries");

router.get("/getSchemas", queries.getSchemas);
router.get("/getTableNames", queries.getTableNames);

module.exports = router;