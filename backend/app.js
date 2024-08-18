require("dotenv").config()
const Application = require("./src/server");
const {sequelize} = require("./src/config/DBConfig")

const PORT= process.env.PORT || 5000

new Application(PORT)