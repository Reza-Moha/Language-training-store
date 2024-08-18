const { UserModel } = require("../../models/User.model");
const JWT = require("jsonwebtoken");
const axios = require("axios");
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
};
