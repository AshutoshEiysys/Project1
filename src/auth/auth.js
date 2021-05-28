var mongoose = require("mongoose");
var constant = require("../config/comman");
var jwt = require("jsonwebtoken");
var UserDetail = require("../models/userDetails");

exports.isAuth = function (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization === "undefined") {
    return res.json({
      status: 401,
      msg: "Session Expired, Please login again",
    });
  }
  var token = req.headers.authorization;
  jwt.verify(token, constant.jwt.secret, function (err, valid) {
    if (err) {
        return res.json({
            status: 401,
            err: err,
          });
    } else if (!valid) {
      return res.json({
        status: 401,
        msg: "Session Expired, Please login again",
      });
    } else {
      UserDetail.findOne(
        { _id: valid._id, isDeleted: false },
        function (err, getUser) {
          if (getUser) {
            req.body.user_params = valid;
            req.decoded = getUser;
            next();
          } else {
            return res.json({
              status: 403,
              msg: "Session Expired, Please login again",
            });
          }
        }
      );
    }
  });
};


