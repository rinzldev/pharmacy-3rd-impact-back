const Sequelize = require("sequelize");
require('dotenv').config()

let connString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

console.log(connString)
const sequelize = new Sequelize(connString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/user.model")(sequelize, Sequelize)
db.offices = require("../models/office.model")(sequelize, Sequelize)
db.medicines = require("../models/medicine.model")(sequelize, Sequelize)
db.invetories = require("../models/inventory.model")(sequelize, Sequelize)
db.laboratory = require("../models/laboratory.model")(sequelize, Sequelize)

module.exports = db;
