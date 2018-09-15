const sql = require("mssql");
const config = require("../config/config");

sql.on("err", err => {
  console.log(err);
});

// schemas
async function getSchemas(req, res, next) {
  try {
    sql.close();
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query(
        "SELECT TABLE_SCHEMA FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA != 'sys' GROUP BY TABLE_SCHEMA"
      );
    res.status(200).json(result.recordset);
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function createSchema(req, res, next) {
  try {
    let schema = req.body.schema;
    console.log(req.body.schema);
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
    sql.close();
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM get_table_data");
    res.status(200).json(result.recordset);
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function getPeople(req, res, next) {
  try {
    let pool = await sql.connect(config);
    let tableName = req.params.tablename;
    let schema = req.params.schema;
    let result = await pool
      .request()
      .query(`SELECT * FROM ${schema}.${tableName}`);
    res.status(200).json({ people: result });
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function insertPerson(req, res, next) {
  try {
    let pool = await sql.connect(config);
    let schema = req.params.schema;
    k;
    let tableName = req.params.tablename;
    await pool
      .request()
      .input("dni", sql.Int, req.body.dni)
      .input("name", sql.VarChar(30), req.body.name)
      .input("surname", sql.VarChar(30), req.body.surname)
      .input("second_surname", sql.VarChar(30), req.body.secondSurname)
      .query(
        `INSERT INTO ${schema}.${tableName} (dni, name, surname, second_surname) 
        VALUES(@dni, @name, @surname, @second_surname)`
      );
    res.status(201).json({ message: "Persona insertada con éxito" });
    sql.close();
  } catch (err) {
    console.log(err);
  }
}

async function genInsert(req, res, next) {
  try {
    sql.close();
    let pool = await sql.connect(config);
    let result2 = await pool
      .request()
      .input("prefix", sql.VarChar, req.body.prefix)
      .input("table_name", sql.VarChar, req.body.table_name)
      .input("table_schema", sql.VarChar, req.body.table_schema)
      .input("proc_schema", sql.VarChar, req.body.proc_schema)
      .execute("genInsert");
    res.status(200).json(result2);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function genUpdate(req, res, next) {
  try {
    sql.close();
    let pool = await sql.connect(config);
    let result2 = await pool
      .request()
      .input("prefix", sql.VarChar, req.body.prefix)
      .input("table_name", sql.VarChar, req.body.table_name)
      .input("table_schema", sql.VarChar, req.body.table_schema)
      .input("proc_schema", sql.VarChar, req.body.proc_schema)
      .execute("genUpdate");
    res.status(200).json(result2);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function genDelete(req, res, next) {
  try {
    sql.close();
    let pool = await sql.connect(config);
    let result2 = await pool
      .request()
      .input("prefix", sql.VarChar, req.body.prefix)
      .input("table_name", sql.VarChar, req.body.table_name)
      .input("table_schema", sql.VarChar, req.body.table_schema)
      .input("proc_schema", sql.VarChar, req.body.proc_schema)
      .execute("genDelete");

    res.status(200).json(result2);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function login(req, res, next) {
  try {
    sql.close();
    config.server = req.body.server;
    config.port = req.body.port;
    config.database = req.body.database;
    config.user = req.body.user;
    config.password = req.body.password;
    await sql.connect(config);
    res.status(200).json({ loggued: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Ha ocurrido un error al conectar con la BD: ${err}` });
  }
}

module.exports = {
  getSchemas: getSchemas,
  createSchema: createSchema,
  getTableNames: getTableNames,
  getPeople: getPeople,
  insertPerson: insertPerson,
  genInsert: genInsert,
  genUpdate: genUpdate,
  genDelete: genDelete,
  login: login
};
