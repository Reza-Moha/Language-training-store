const { UserModel } = require("../../models/User.model");
const JWT = require("jsonwebtoken");
const axios = require("axios");
const { TokenModel } = require("../../models/Token.model");
const signAccessToken = (userId) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await UserModel.findByPk(userId);
      const payload = {
        phoneNumber: user?.phoneNumber,
      };
      JWT.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "10m" },
        (error, token) => {
          console.log("error", error);
          console.log("token", token);
          if (error) rej(new Error("خطای سرور"));
          res(token);
        },
      );
    } catch (error) {
      console.log(error);
      rej(new Error("خطای سرور"));
    }
  });
};

const signRefreshToken = (userId) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await UserModel.findByPk(userId);
      const payload = {
        phoneNumber: user?.phoneNumber,
      };
      JWT.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "4d" },
        (error, token) => {
          if (error) rej(new Error("خطای سرور"));
          res(token);
        },
      );
    } catch (error) {
      rej(new Error("خطای سرور"));
    }
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (error, payload) => {
        if (error)
          return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const { phoneNumber } = payload || {};
        const User = await UserModel.findOne({
          where: { phoneNumber },
          attributes: {
            exclude: ["password", "otp"],
          },
          include: [
            {
              model: TokenModel,
            },
          ],
        });
        console.log("verifyRefreshToken", User);
        if (!User)
          reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
        const refreshToken = await User.token.refreshToken;
        if (!refreshToken) reject(createError.Unauthorized("توکن نامعتبر است"));
        if (token === refreshToken) return resolve(phoneNumber);
        reject(createError.Unauthorized("ورود مجدد به حساب کاربری ناموفق بود"));
      },
    );
  });
};

const sendAuthSms = async (recNumber, token1, token2, token3) => {
  const AccessHash = process.env.SMS_ACCESS_HASH;
  const PatternId = process.env.SMS_PATTERN_ID;
  const url = `https://smspanel.trez.ir/SendPatternCodeWithUrl.ashx?AccessHash=${AccessHash}&Mobile=${encodeURIComponent(recNumber)}&PatternId=${PatternId}&token1=${encodeURIComponent(token1)}&token2=${encodeURIComponent(token2)}&token3=${encodeURIComponent(token3)}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  sendAuthSms,
  verifyRefreshToken,
};
