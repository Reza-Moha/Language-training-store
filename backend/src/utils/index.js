const corsOptions =require ("./CorsOptions");
const rateLimit = require("express-rate-limit");
const {sendAuthSms,signAccessToken,signRefreshToken} = require("./auth/index")
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});


const randomNumberGenerator = () => {
    const number = Math.floor(Math.random() * 100000 + 1);
    if (number.toString().length > 4) {
        return number;
    }
    return randomNumberGenerator();
};



module.exports = {
    corsOptions,
    apiLimiter,
    randomNumberGenerator,
    sendAuthSms,signRefreshToken, signAccessToken
}

