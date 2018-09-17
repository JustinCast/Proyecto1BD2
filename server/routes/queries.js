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
    config.database = req.body.database;
    config.port = req.body.port;
    config.user = req.body.user;
    config.password = req.body.password;
    await sql.connect(config);
    res.status(200).json({ loggued: true });
  } catch (error) {
    res.status(500).send({
      message: `Ha ocurrido un error al conectar con la BD: ${error}`
    });
  }
}

async function checkIfProcsExist(req, res, next) {
  try {
    let createBody = `CREATE OR ALTER PROCEDURE genInsert
    (
        @prefix VARCHAR (30),
        @table_name VARCHAR (50),
        @table_schema VARCHAR (30),
        @proc_schema VARCHAR (30)
    )
    AS
    DECLARE
        @sql Nvarchar (2000),
        @params VARCHAR(500),
        @columns_list VARCHAR(500),
        @params_list VARCHAR(500),
        @column varchar(50),
        @data_type varchar(50),
        @length varchar(50)
    declare c_columnas CURSOR FOR
        select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH from INFORMATION_SCHEMA.COLUMNS
        where TABLE_SCHEMA= @table_schema and TABLE_NAME= LOWER(@table_name)
    BEGIN
        SET @sql='CREATE PROCEDURE '+ @proc_schema + '.' + @prefix + '_insertar_' + @table_name
        OPEN c_columnas
        FETCH NEXT FROM c_columnas
        INTO @column , @data_type, @length
        SET @params ='('
        SET @columns_list ='('
        SET @params_list ='('
        WHILE @@FETCH_STATUS = 0
        BEGIN
    
            IF @length IS NULL
            BEGIN
                SET @params = @params + '@' + @column + ' ' + @data_type + ', '
            END
            ELSE
            BEGIN
                SET @params = @params + '@' + @column + ' ' + @data_type + '(' + @length + '), '
            END
            SET @columns_list = @columns_list + @column + ', '
            SET @params_list = @params_list + '@' + @column + ', '
    
            FETCH NEXT FROM c_columnas
            INTO @column , @data_type, @length
        END
        SET @params = SUBSTRING(@params, 0, LEN(@params)) + ')'
        SET @columns_list = SUBSTRING(@columns_list, 0, LEN(@columns_list)) + ')'
        SET @params_list = SUBSTRING(@params_list, 0, LEN(@params_list)) + ')'
        CLOSE c_columnas
        DEALLOCATE c_columnas;
    
        set @sql= @sql + @params + ' AS BEGIN INSERT INTO '
        set @sql= @sql + @table_schema + '.' + @table_name + @columns_list + ' values' + @params_list + '; END'
    
        EXECUTE sp_executesql @sql
        
        PRINT @sql
    END`;
    sql.close();
    let pool = await sql.connect(config);
    let request = await pool.request();
    request.batch(`${createBody}`, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
    let updateBody = `CREATE OR ALTER PROCEDURE genUpdate(
      @prefix VARCHAR (30),
      @table_name VARCHAR (50),
      @table_schema VARCHAR (30),
      @proc_schema VARCHAR (30)
  )
  AS
  DECLARE
      @sql NVARCHAR (2000), --Query para ejecutar.
      @parametros VARCHAR(500), --    
      @valores_modificar VARCHAR(500), --Columnas de la tabla.
      @atributo VARCHAR(30),
      @tipo_datos VARCHAR(30),
      @size VARCHAR(30),
      @columna_key varchar(30)
  DECLARE cursor_cols CURSOR FOR 
      SELECT COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA= @table_schema AND TABLE_NAME = LOWER(@table_name)
  DECLARE cursor_key CURSOR FOR 
      SELECT kcu.COLUMN_NAME 
          FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc INNER JOIN  INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
          ON (kcu.CONSTRAINT_NAME=tc.CONSTRAINT_NAME)
      WHERE tc.TABLE_SCHEMA= @table_schema AND tc.TABLE_NAME= @table_name AND tc.CONSTRAINT_TYPE= 'PRIMARY KEY'
  BEGIN
      SET @sql= 'CREATE PROCEDURE ' + @proc_schema + '.' + @prefix + '_modificar_' + @table_name
      OPEN cursor_cols
          FETCH NEXT FROM cursor_cols
              INTO @atributo,@tipo_datos,@size
      OPEN cursor_key
          FETCH NEXT FROM cursor_key
              INTO @columna_key
      SET @parametros='('
      SET @valores_modificar='SET '
      WHILE @@FETCH_STATUS = 0
          BEGIN
              IF @size IS NULL --Si no es un varchar.
                  BEGIN
                      SET @parametros=@parametros+'@'+@atributo+' '+@tipo_datos+', '
                  END
              ELSE --Si, es varchar.
                  BEGIN
                      SET @parametros=@parametros+'@'+@atributo+' '+@tipo_datos+'('+@size+'), '
                  END
  
              SET @valores_modificar=@valores_modificar+@atributo+' = @'+@atributo+', '
              FETCH NEXT FROM cursor_cols
              INTO @atributo , @tipo_datos, @size
          END 
      SET @parametros=SUBSTRING(@parametros,0,LEN(@parametros))+')'
      SET @valores_modificar=SUBSTRING(@valores_modificar,0,LEN(@valores_modificar))
      CLOSE cursor_cols
      DEALLOCATE cursor_cols; 
          SET @sql=@sql+@parametros + ' AS BEGIN  UPDATE ' 
          SET @sql= @sql + @table_schema + '.' + @table_name + ' ' + @valores_modificar + ' WHERE ' + @columna_key + '=@' + @columna_key + '; END;'
          EXECUTE sp_executesql @sql
        PRINT @sql
      CLOSE cursor_key
      DEALLOCATE cursor_key;    
      END`;
    request = await pool.request();
    request.batch(`${updateBody}`, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
    let deleteBody = `CREATE OR ALTER PROCEDURE genDelete
    (
        @prefix VARCHAR (30),
        @table_name VARCHAR (50),
        @table_schema VARCHAR (30),
        @proc_schema VARCHAR (30)
    )
    AS
    DECLARE
        @sql NVARCHAR (2000),
        @params VARCHAR(500),
        @columns_list VARCHAR(500),
        @params_list VARCHAR(500),
        @column VARCHAR(50),
        @data_type VARCHAR(50),
        @length INT
    DECLARE c_columnas CURSOR FOR
        SELECT c.DATA_TYPE, c.CHARACTER_MAXIMUM_LENGTH,kcu.COLUMN_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc, INFORMATION_SCHEMA.COLUMNS AS c, INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS kcu
        WHERE kcu.CONSTRAINT_NAME=tc.CONSTRAINT_NAME AND tc.TABLE_SCHEMA= @table_schema AND tc.TABLE_NAME= @table_name AND tc.CONSTRAINT_TYPE= 'PRIMARY KEY' AND 
        kcu.COLUMN_NAME =c.COLUMN_NAME;
    BEGIN 
        
        SET @sql='CREATE PROCEDURE '+ @proc_schema + '.' + @prefix + '_eliminar_' + @table_name
        OPEN c_columnas
        FETCH NEXT FROM c_columnas
        INTO @data_type,@length,@column
        SET @params =' '
        IF @length IS NULL --Si no es un varchar.
            BEGIN
                SET @params = @params + '(@' + @column + ' ' + @data_type + ')'
            END
        ELSE --Si, es varchar.
            BEGIN
                SET @params = @params + '(@' + @column + ' ' + @data_type + '(' + @length + '))'
            END
      SET @params = @params + ' AS BEGIN DELETE FROM ' + @table_schema + '.' + @table_name + ' WHERE ' + @column + ' = @' + @column + '; END;'
        SET @sql = @sql+' ' + @params
      EXECUTE sp_executesql @sql
        print @sql
        CLOSE c_columnas
        DEALLOCATE c_columnas;
        
    END`;
    request = await pool.request();
    request.batch(`${deleteBody}`, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
  } catch (error) {}
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
  login: login,
  checkIfProcsExist: checkIfProcsExist,
};
