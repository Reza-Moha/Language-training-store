const { HomeRoutes } = require("./home/index");
const router = require("express").Router();

router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router,
};
