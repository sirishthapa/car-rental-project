const Sequelize = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    "root",
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected successfully !");
    })
    .catch((err) => {
        console.log("Error in connecting with database", err);
    })

module.exports = sequelize

