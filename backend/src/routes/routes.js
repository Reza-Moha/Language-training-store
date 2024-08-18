const { HomeRoutes } = require("./home/Home.routes");
const {apiLimiter} = require("../utils");
const {AuthRoutes} = require("./auth/Auth.routes");
const router = require("express").Router();
router.use(apiLimiter);
router.use("/", HomeRoutes);
router.use("/auth", AuthRoutes);

module.exports = {
    AllRoutes: router,
};
