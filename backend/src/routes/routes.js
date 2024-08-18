const { HomeRoutes } = require("./home/index");
const {apiLimiter} = require("../utils");
const router = require("express").Router();
router.use(apiLimiter);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router,
};
