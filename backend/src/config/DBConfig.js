require("dotenv").config();
const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging:false
});

sequelize
    .authenticate()
    .then(async () => {
        await sequelize.sync({ alter: true });
        console.log("connected to Sql server");
    })
    .catch((error) => {
        console.log("Can not connect to sql server", error?.message);
    });

module.exports = sequelize;
