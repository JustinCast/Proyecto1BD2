const sql = require("mssql");
const config = require("../config/config");

sql.on("err", err => {
  console.log("Ha ocurrido un error inesperado al conectar con la BD");
});

// schemas
async function getSchemas(req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT name FROM sys.schemas");
    res.status(200).json({ result: result });
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function createSchema(req, res, next) {
  try {
    let schema = req.body.schema;
    let pool = await sql.connect(config);
    let result = await pool.request().query("CREATE SCHEMA " + schema);
    res.status(201).json({ message: "Esquema creado correctamente" });
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function getTableNames(req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT name FROM sys.Tables");
    res.status(200).json({ resultado: result });
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getSchemas: getSchemas,
  getTableNames: getTableNames,
  createSchema: createSchema
};
