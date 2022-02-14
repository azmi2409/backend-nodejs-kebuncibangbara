const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const fs = require("fs");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    ssl: { ca: fs.readFileSync("./_helpers/ca-bundle.crt") },
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync("./_helpers/ca-bundle.crt"),
      },
    },
  });

  // init models and add them to the exported db object
  db.User = require("../users/user.model")(sequelize);
  db.Tree = require("../trees/tree.model")(sequelize);
  db.Log = require("../Logs/log.model")(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
