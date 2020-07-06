const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema({
  ativo: { 
    type :Boolean,
    default: true
  },
  name: String,
  email: {
    type: String,
    index: {
      unique: true,
      dropDups: true,
    }
  },
  password: String,
});

Schema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model('Usuario', Schema);