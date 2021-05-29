"use strict";
var UserDetail = require("../models/userDetails");
var constant = require("../config/comman");

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var createAccount = function (req, res) {
  try {
    let condition = {
      email: req.body.email,
      isDeleted: false,
    };
    let object = req.body;
    UserDetail.find(condition).exec(async (err, userData) => {
      if (err) {
        return res.json({
          status: 404,
          error: err,
        });
      } else if (userData.length > 0) {
        return res.json({
          status: 404,
          msg: "Email already exist. Please try using another email.",
        });
      } else {
        var password = await bcrypt.hash(req.body.password, 10);
        object["password"] = password;
        var new_user = new UserDetail(object);
        new_user.save(function (err, result) {
          if (err) {
            return res.json({
              status: 404,
              error: err,
            });
          } else {
            return res.json({
              status: 200,
              msg: "User created successfully",
              data: result,
            });
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    return res.json({
      status: 404,
      msg: "Oops!! Something went wrong.",
    });
  }
};

var loginUser = function (req, res) {
  try {
    let condition = {
      email: req.body.email,
      isDeleted: false,
    };
    let object = req.body;
    UserDetail.find(condition).exec(async (err, userData) => {
      if (err) {
        return res.json({
          status: 404,
          error: err,
        });
      } else if (userData.length === 0) {
        return res.json({
          status: 404,
          msg: "Email does not exist. Please create account first.",
        });
      } else {
        let existPass = userData[0].password;
        var password = await bcrypt.compare(req.body.password, existPass);
        const token = await jwt.sign(
          { _id: userData[0]._id },
          constant.jwt.secret,
          { expiresIn: constant.jwt.expire }
        );
        if (password) {
          return res.json({
            status: 200,
            msg: "Login Successful",
            userData: userData[0],
            token: token,
          });
        } else {
          return res.json({
            status: 404,
            msg: "Incorrect password",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

var createETHAccount = async function (req, res) {
  var obj = new ObjectId(req.body._id);
  const Web3 = require("web3");
  let web3 = new Web3("ws://localhost:3200");
  try {
    if (req.body._id) {
      UserDetail.find({ _id: obj }).exec(async (err, userData) => {
        if (err) {
          return res.json({
            status: 404,
            error: err,
          });
        } else if (userData.length === 0) {
          return res.json({
            status: 404,
            msg: "User does not exist. Please check _id again.",
          });
        } else {
          let existETH = userData[0];
          if (
            existETH.ETH &&
            (existETH.ETH.address || existETH.ETH.private_key)
          ) {
            return res.json({
              status: 404,
              msg: "User already having an Ethereum account.",
            });
          } else {
            let response = web3.eth.accounts.create();
            if (response) {
              let object = {
                ETH: {
                  address: response.address,
                  private_key: response.privateKey,
                },
              };
              UserDetail.findOneAndUpdate(
                { _id: req.body._id },
                object,
                { new: true },
                function (err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                  }
                }
              );
              return res.json({
                status: 200,
                msg: "Account created successfully",
                data: response,
              });
            } else {
              return res.json({
                status: 404,
                msg: "Oops!! Something went wrong.",
              });
            }
          }
        }
      });
    }
  } catch (e) {
    res.send(e);
    return res.json({
      status: 404,
      msg: "Oops!! Something went wrong.",
    });
  }
};



exports.createAccount = createAccount;
exports.loginUser = loginUser;
exports.createETHAccount = createETHAccount;
