const {
  randomNumberGenerator,
  sendAuthSms,
  signAccessToken,
  signRefreshToken,
} = require("../../utils");
const { getOtpSchema, checkOtpSchema } = require("../../validators");
const { UserModel } = require("../../models/User.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { TokenModel } = require("../../models/Token.model");

class AuthController {
  async getOtp(req, res, next) {
    try {
      const { phoneNumber } = await getOtpSchema.validateAsync(req.body);
      const code = randomNumberGenerator();
      const expiresIn = new Date().getTime() + 60000;
      const otp = {
        code,
        expiresIn,
      };
      const user = await UserModel.findOne({ where: { phoneNumber } });

      if (user) {
        await user.update({ otp });
      } else {
        await UserModel.create({ phoneNumber, otp });
      }
      // await sendAuthSms(phoneNumber, code, "", "");
      console.log("you otp code is :", code);
      const codeLength = String(code).length;
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        success: true,
        message: `کد احراز هویت به شماره موبایل ${phoneNumber} ارسال گردید`,
        phoneNumber,
        codeLength,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const { phoneNumber, code } = await checkOtpSchema.validateAsync(
        req.body,
      );

      const foundUser = await UserModel.findOne({ where: { phoneNumber } });
      if (!foundUser) throw { message: "کاربری با این مشخصات وجود ندارد" };

      const userOtp = foundUser.get("otp");
      if (userOtp.code !== +code)
        throw { message: "کد ارسال شده صحیح نمی باشد " };

      const now = Date.now();
      if (parseInt(userOtp.expiresIn) <= parseInt(now)) {
        throw {
          message: "کد احراز هویت شما منقضی شده لطفا دوباره امتحان کنید",
        };
      }

      const accessToken = await signAccessToken(foundUser.id);
      const refreshToken = await signRefreshToken(foundUser.id);
      const token = await TokenModel.create({
        accessToken,
        refreshToken,
        expire: new Date(Date.now() + 1200000),
      });
      await foundUser.update({
        tokenId: token.id,
        phoneNumberVerify: true,
      });
      await foundUser.save();

      res.cookie("accessToken", token.accessToken, {
        sameSite: "lax",
        secure: true,
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", token.refreshToken, {
        sameSite: "lax",
        secure: true,
        maxAge: 4 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        auth: true,
        message: "احراز هویت شما با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
