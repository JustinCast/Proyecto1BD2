const sql = require("mssql");
const config = require("../config/config");

sql.on("err", err => {
  console.log("Ha ocurrido un error inesperado al conectar con la BD");
});

async function getSchemas(req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT name FROM sys.schemas");
    res.status(200).json({resultado: result});
  } catch (err) {
    console.log(err);
  }
}

async function getTableNames(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query("SELECT name FROM sys.Tables");
      res.status(200).json({resultado: result});
    } catch (err) {
      console.log(err);
    }
}

module.exports = {
  getSchemas: getSchemas,
  getTableNames: getTableNames
};
