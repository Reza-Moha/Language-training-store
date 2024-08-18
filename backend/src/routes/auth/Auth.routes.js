const router = require("express").Router();
const { AuthController } = require("../../controller/auth/Auth.controller");

router.post("/get-otp", AuthController.getOtp);
router.post("/check-otp", AuthController.checkOtp);

module.exports = {
  AuthRoutes: router,
};
