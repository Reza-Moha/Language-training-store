const router = require("express").Router();
const HomeController = require("../../controller/home/Home.controller")
/**
 * @swagger
 * tags:
 *    name: IndexPage
 *    description: Index page route and data
 */
/**
 * @swagger
 *
 * /:
 *  get:
 *    summary: Index of Routes
 *    tags: [IndexPage]
 *    description: get all need data for index page
 *    parameters:
 *        -   in: header
 *            name: accessToken
 *            example: Bearer YourToken
 *    responses:
 *        200:
 *            description: success
 *        404:
 *            description: not Found
 */
router.get("/",HomeController.indexPage);

module.exports = {
    HomeRoutes: router,
};
