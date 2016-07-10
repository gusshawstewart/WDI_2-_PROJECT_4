var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
  firstName:    { type: String },
  lastName:     { type: String },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

userSchema
  .virtual("password")
  .get(getPassword)
  .set(setPassword);

userSchema
  .virtual("passwordConfirmation")
  .get(getPasswordConfirmation)
  .set(setPasswordConfirmation);

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model("User", userSchema);

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash, null);
}

function getPassword(){
  return this._password;
}

function setPassword(password){
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function getPasswordConfirmation(){
  return this._passwordConfirmation;
}

function setPasswordConfirmation(value){
  this._passwordConfirmation = value;
}
