const router = require("express").Router();
const { AuthController } = require("../../controller/auth/Auth.controller");
const { AuthorizationGuard } = require("../../guards/Authorization.guard");

router.post("/get-otp", AuthController.getOtp);

router.post("/check-otp", AuthController.checkOtp);

router.get("/refresh-token", AuthController.refreshToken);

module.exports = {
  AuthRoutes: router,
};
