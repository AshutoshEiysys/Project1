var express = require("express");
var router = express.Router();

var userCtrl = require("../controllers/userController");
var auth = require("../auth/auth");


router.use("/login", userCtrl.loginUser); //done
router.use("/createAccount", userCtrl.createAccount); //done
router.use("/createETHAccount", auth.isAuth, userCtrl.createETHAccount); //done

module.exports = router;
