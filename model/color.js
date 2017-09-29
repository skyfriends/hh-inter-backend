const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: { type: String, required: false },
  created: { type: Date, required: false },
});

module.exports = mongoose.model('color', colorSchema);
