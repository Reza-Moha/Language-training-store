const Controller = require("../Controller");
const { StatusCodes: HttpStatus} = require("http-status-codes");

module.exports = new (class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            res.locals.csrfToken = req.csrfToken();
            return res.status(HttpStatus.OK).send({
                status:HttpStatus.OK,
                message:"Home Page"
            });
        } catch (error) {
            next(error);
        }
    }
})();
