const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: { type: String, required: false, unique: true },
  hsl: { type: String, required: false },
  hue: { type: Number, required: false },
  saturation: { type: Number, required: false },
  lightness: { type: Number, required: false },
  created: { type: Date, required: false },
});

module.exports = mongoose.model('color', colorSchema);
