const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const fs = require("fs");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || 3306;
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_DATABASE || "cbr-farm-management";
  const dsn = process.env.DB_URL;
  const connection = await mysql.createConnection(dsn);
  console.log("Connected to database");
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
  db.Log = require("../logs/log.model")(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
