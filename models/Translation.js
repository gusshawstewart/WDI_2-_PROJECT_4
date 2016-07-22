var mongoose = require('mongoose');

var TranslationSchema = mongoose.Schema({
  title: String,
  date: String,
  transcript: String
});

module.exports = mongoose.model('Translation', TranslationSchema);

