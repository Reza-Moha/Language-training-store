const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.WHITE_LIST_ORGIN.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

module.exports = corsOptions;
