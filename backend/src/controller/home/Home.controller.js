const Controller = require("../Controller");
const { StatusCodes: HttpStatus, OK} = require("http-status-codes");

module.exports = new (class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(HttpStatus.OK).send({
                status:HttpStatus.OK,
                message:"Home Page"
            });
        } catch (error) {
            next(error);
        }
    }
})();
