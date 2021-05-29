var express = require("express");
var router = express.Router();
const app = express();
var userCtrl = require("../controllers/userController");
var auth = require("../auth/auth");

/**
 * @swagger
 * /users/createAccount:
 *   post:
 *     description: Create new Account/ Sign Up
 *     requestBody:
 *          required : true
 *          content: 
 *             application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                      - email
 *                    properties:
 *                      fullName:
 *                        type: string
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *                      username:
 *                        type: string
 *     responses:
 *       200:
 *         description: Created
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Login
 *     requestBody:
 *          required : true
 *          content: 
 *             application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                      - email
 *                    properties:
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *     responses:
 *       200:
 *         description: Created
 */

/**
 * @swagger
 * /users/createETHAccount:
 *   post:
 *     description: Create new Account ETH account
 *     headers:
 *        WWW_Authenticate:
 *           schema:
 *              type: string
 *     requestBody:
 *          required : true
 *          content: 
 *             application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                      - _id
 *                    properties:
 *                      _id:
 *                        type: string
 *     responses:
 *       200:
 *         description: Created
 */



router.use("/login", userCtrl.loginUser); //done
router.use("/createAccount", userCtrl.createAccount); //done
router.use("/createETHAccount", auth.isAuth, userCtrl.createETHAccount); //done

module.exports = router;
