const Application = require("./src/server");
require("dotenv").config()

const PORT= process.env.PORT || 5000

new Application(PORT)