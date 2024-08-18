const corsOptions =require ("./CorsOptions");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
const csrfProtection = csrf({ cookie: true });

module.exports = {
    corsOptions,
    apiLimiter,
    csrfProtection
}

