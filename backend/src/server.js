const express = require("express");
const http = require("http");
const path = require("path");
const {corsOptions, csrfProtection} = require("./utils");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const createError = require("http-errors");
const {AllRoutes} = require("./routes/routes");
const helmet = require("helmet");
const hpp = require("hpp");
module.exports = class Application{
    #app = express();
    #PORT;
    constructor(port){
        this.#PORT = port;
        this.configApplication()
        this.createServer(port)
        this.createRoutes()
        this.errorHandling()
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server running on http://localhost:${this.#PORT}`);
        });
    }

    configApplication() {
        this.#app.use(express.static(path.join(__dirname, "public")));
        this.#app.use(cors(corsOptions));
        this.#app.use(cookieParser(process.env.COOKIES_SECRET_KEY, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }));
        this.#app.use(helmet());
        this.#app.use(hpp());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(
            "/api-doc",
            swaggerUi.serve,
            swaggerUi.setup(
                swaggerJsDoc({
                    swaggerDefinition: {
                        info: {
                            title: "فروشگاه آموزش زبان پرفسور افشار",
                            version: "0.1",
                            description: "فروش محصولات آموزش زبان اعم از زبان ترکی استانبولی و عربی و انگلیسی",
                            contact: {
                                name: "Reza Mohammadzadeh",
                                url: "https://soltandidasan.com/",
                                email: "rezamohammadzadeh797@yahoo.com",
                            },
                        },
                        servers: [
                            {
                                url: "http://localhost:5000",
                            },
                        ],
                    },
                    apis: ["./app/router/**/*.js"],
                }),
            ),
        );
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر یافت نشد"));
        });
        this.#app.use((error, req, res, next) => {
            const statusCode =
                error.status || createError.InternalServerError().status;
            const message =
                error.message || createError.InternalServerError().message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message,
                },
            });
        });
    }
}