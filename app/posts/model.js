const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  ativo: { 
    type :Boolean,
    default: true
  },
  title: String,
  content: String,
  creation_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Posts', Schema);