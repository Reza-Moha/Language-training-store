const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const { TokenModel } = require("../models/Token.model");
const AuthorizationGuard = async (req, res, next) => {
  try {
    const { accessToken } = req?.cookies;
    if (!accessToken)
      throw new createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
    const { phoneNumber } = JWT.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
    );
    if (phoneNumber) {
      const user = await UserModel.findOne({
        where: { phoneNumber },
        attributes: {
          exclude: [
            "accessToken",
            "refreshToken",
            "createdAt",
            "updatedAt",
            "otp",
          ],
        },
        include: [
          {
            model: TokenModel,
          },
        ],
      });
      if (!user) throw new createError.NotFound("کاربری یافت نشد");
      req.user = user.dataValues;
      return next();
    }
    throw new createError.Forbidden("توکن ارسال شده نامعتبر است");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthorizationGuard,
};
