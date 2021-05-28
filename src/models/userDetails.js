var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String,
    default: "None",
  },
  username: {
    type: String,
    default: "None",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  ETH: {
    address: {
      type: String,
    },
    private_key: {
      type: String,
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
  },
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
